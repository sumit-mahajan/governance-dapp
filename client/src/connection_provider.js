import React, { useContext, useEffect, useState } from 'react';
import GovToken from "./contracts/GovToken.json";
import Exchange from "./contracts/Exchange.json";
import Web3 from "web3";

// geth attach ipc:\\.\pipe\geth.ipc
// Mumbai Token Contract Address : 0xF62f221D58fE57C088D27283B0BC516710eC4E0d
const ConnectionContext = React.createContext();

export function useConnection() {
    return useContext(ConnectionContext);
}

export function ConnectionProvider(props) {
    const [connectionState, setConnectionState] = useState({
        web3: null,
        networkName: "Mumbai Testnet",
        accounts: [],
        govContract: null,
        exchangeContract: null,
        errors: null,
    });

    const initiate = async () => {
        if (connectionState.web3) return;

        try {
            // Use local web3 object by default before user connects metamask
            const provider = new Web3.providers.HttpProvider("https://rpc-mumbai.maticvigil.com");
            const web3 = new Web3(provider);

            const govContract = await createGovInstance(web3);
            const exchangeContract = await createExchangeInstance(web3);

            setConnectionState({ ...connectionState, web3, govContract, exchangeContract, networkName: 'Mumbai Testnet' });
        } catch (e) {
            console.log("useConnection Error ", e);
            setConnectionState({ ...connectionState, errors: e });
        }
    };

    const connectWallet = async () => {
        try {
            // Get web3 injected by metamask
            const web3 = await getWeb3();

            const networkId = await web3.eth.net.getId();

            let networkName = "Private";

            // Set networkName for navbar
            switch (networkId) {
                case 80001:
                    networkName = "Mumbai Testnet";
                    break;
                case 1:
                    networkName = 'Mainnet';
                    break
                case 2:
                    networkName = 'Morden';
                    break
                case 3:
                    networkName = 'Ropsten';
                    break
                case 4:
                    networkName = 'Rinkeby';
                    break
                case 5:
                    networkName = 'Goerli';
                    break
                case 42:
                    networkName = 'Kovan';
                    break
                case 5777:
                    networkName = 'Localhost 7545';
                    break
                default:
                    networkName = 'Unknown';
            }

            const accounts = await web3.eth.getAccounts();

            const govContract = await createGovInstance(web3);
            const exchangeContract = await createExchangeInstance(web3);

            setConnectionState({ ...connectionState, web3, networkName, accounts, govContract, exchangeContract });
        } catch (e) {
            console.log("useConnection Error ", e);
            setConnectionState({ ...connectionState, errors: e });
        }
    }

    async function createGovInstance(web3) {
        if (web3) {
            // const networkId = await web3.eth.net.getId();
            // const deployedNetwork = GovToken.networks[networkId];

            // if (deployedNetwork) {
            //     const newInstance = new web3.eth.Contract(
            //         GovToken.abi,
            //         deployedNetwork.address
            //     );

            //     return newInstance;
            // } else {
            //     throw "Use Correct Network";
            // }
            return new web3.eth.Contract(
                GovToken.abi,
                //"0xF62f221D58fE57C088D27283B0BC516710eC4E0d"
                // "0x6EB7f341eBc06dF6b78413a5B448795D9A9Cb833"
                "0xd0583d07b60490a248fA3Db9330c7642086c60eD"
            );
        }
    }

    async function createExchangeInstance(web3) {
        if (web3) {
            // const networkId = await web3.eth.net.getId();
            // const deployedNetwork = GovToken.networks[networkId];

            // if (deployedNetwork) {
            //     const newInstance = new web3.eth.Contract(
            //         GovToken.abi,
            //         deployedNetwork.address
            //     );

            //     return newInstance;
            // } else {
            //     throw "Use Correct Network";
            // }
            return new web3.eth.Contract(
                Exchange.abi,
                "0xF95050fdE7496e202B418F6AE19ae0f91FAcd310"
            );
        }
    }

    useEffect(() => {
        initiate();

        // Detect metamask account change
        window.ethereum.on('accountsChanged', async function (_accounts) {
            const web3 = await getWeb3();
            const govContract = await createGovInstance(web3);
            setConnectionState({ ...connectionState, web3, accounts: _accounts, govContract });
        })

        // Detect metamask network change
        window.ethereum.on('networkChanged', function (networkId) {
            window.location.reload();
        });
    }, []);

    return (
        <>
            <ConnectionContext.Provider value={{ connectionState, setConnectionState, connectWallet }}>
                {props.children}
            </ConnectionContext.Provider>
        </>
    );
}

const getWeb3 = async () => {
    // Modern dgov browsers...
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            await window.ethereum.enable();
            // Accounts now exposed
            return web3;
        } catch (error) {
            throw error;
        }
    }
    // Legacy dgov browsers...
    else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        return web3;
    }
    // Fallback to localhost; use dev console port by default...
    else {
        const provider = new Web3.providers.HttpProvider(
            "http://127.0.0.1:7545"
        );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        return web3;
    }
}
