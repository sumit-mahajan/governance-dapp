import React, { useContext, useEffect, useState } from 'react';
import Web3 from "web3";
import GovToken from "./contracts/GovToken.json";
import Exchange from "./contracts/Exchange.json";

const defaultChainId = 5777;

export const supportedNetworks = {
    5777: {
        name: 'Truffle',
        tokenSymbol: 'ETH',
        rpcURL: 'http://localhost:7545',
        govAddress: GovToken.networks[5777] ? GovToken.networks[5777].address : '',
        exchangeAddress: Exchange.networks[5777] ? Exchange.networks[5777].address : '',
    },
    80001: {
        name: 'Mumbai',
        tokenSymbol: 'MATIC',
        rpcURL: 'https://rpc-mumbai.maticvigil.com',
        govAddress: '0xd0583d07b60490a248fA3Db9330c7642086c60eD',
        exchangeAddress: '0xF95050fdE7496e202B418F6AE19ae0f91FAcd310',
    }
}

const ConnectionContext = React.createContext();

export function useConnection() {
    return useContext(ConnectionContext);
}

export function ConnectionProvider(props) {
    const [connectionState, setConnectionState] = useState({
        web3: null,
        chainId: defaultChainId,
        accounts: [],
        govContract: null,
        exchangeContract: null,
        error: null,
    });

    const initiate = async () => {
        try {
            // Use local web3 object by default before user connects metamask
            const provider = new Web3.providers.HttpProvider(supportedNetworks[defaultChainId].rpcURL);
            const web3 = new Web3(provider);

            const govContract = new web3.eth.Contract(
                GovToken.abi,
                supportedNetworks[defaultChainId].govAddress
            );

            const exchangeContract = new web3.eth.Contract(
                Exchange.abi,
                supportedNetworks[defaultChainId].exchangeAddress
            );

            setConnectionState({ ...connectionState, web3, govContract, exchangeContract });
        } catch (e) {
            console.log("useConnection : initiate Error -> ", e.toString());
            setConnectionState({ ...connectionState, error: e.toString() });
        }
    };

    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                throw "Browser Wallet Not Found";
            }

            const web3 = new Web3(window.ethereum);

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            const chainId = await web3.eth.net.getId();

            if (!supportedNetworks[chainId]) {
                throw "Use Correct Network"
            }

            const govContract = new web3.eth.Contract(
                GovToken.abi,
                supportedNetworks[chainId].govAddress
            );

            const exchangeContract = new web3.eth.Contract(
                Exchange.abi,
                supportedNetworks[chainId].exchangeAddress
            );

            setConnectionState({ ...connectionState, web3, accounts, chainId, govContract, exchangeContract });
        } catch (e) {
            if (e.code === 4001) {
                // User rejected request
                e = 'Denied Browser Wallet Access';
            }
            console.log("useConnection : connectWallet Error -> ", e.toString());
            setConnectionState({ ...connectionState, error: e.toString() });
        }
    }

    useEffect(() => {
        initiate();

        if (window.ethereum) {
            // Detect metamask account change
            window.ethereum.on('accountsChanged', async function (_accounts) {
                setConnectionState({ ...connectionState, accounts: _accounts })
            })

            // Detect metamask network change
            window.ethereum.on('chainChanged', function (networkId) {
                connectWallet();
            });
        }
    }, []);

    return (
        <>
            <ConnectionContext.Provider value={{ connectionState, setConnectionState, connectWallet }}>
                {props.children}
            </ConnectionContext.Provider>
        </>
    );
}

// // Set networkName for navbar
// switch (chainId) {
//     case 5777:
//         networkName = 'Truffle';
//         break
//     case 31337:
//         networkName = 'Hardhat';
//         break;
//     case 80001:
//         networkName = "Mumbai";
//         break;
//     case 4:
//         networkName = 'Rinkeby';
//         break
//     case 137:
//         networkName = 'Polygon';
//         break
//     case 1:
//         networkName = 'Ethereum';
//         break
//     case 3:
//         networkName = 'Ropsten';
//         break
//     case 42:
//         networkName = 'Kovan';
//         break
//     default:
//         networkName = 'Unknown';
// }
