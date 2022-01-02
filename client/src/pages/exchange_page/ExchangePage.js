import React, { useState } from 'react';
import './exchange_page.scss';
import Loading from '../../components/loading/Loading';
import { Box } from '../../components/Box';
import { useConnection } from '../../connection_provider';

function ExchangePage() {
    const { connectionState, setConnectionState } = useConnection();
    const { accounts, govContract, exchangeContract } = connectionState;

    const [isLoading, setLoading] = useState(false);

    const ethToGov = 100;
    const [token1, setToken1] = useState({
        symbol: "MATIC",
        placeholder: 1
    });
    const [token2, setToken2] = useState({
        symbol: "GOV",
        placeholder: 100
    })

    const switchTokens = () => {
        const temp = token1;
        setToken1(token2);
        setToken2(temp);
        const ethField = document.getElementById("MATIC");
        const govField = document.getElementById("GOV");
        const t = ethField.value;
        ethField.value = govField.value;
        govField.value = t;
        console.log( exchangeContract.address )
    }

    const onInputChange = (event) => {
        const ethField = document.getElementById("MATIC");
        const govField = document.getElementById("GOV");
        if (event.target.id === "MATIC") {
            govField.value = ethField.value * ethToGov;
        } else {
            ethField.value = govField.value / ethToGov;
        }
    }
    
    const handleExchange = async(e) => {
        const type = e.target.textContent;
        
        if(type === 'Buy GOV') {
            // Buy tokens
            const ethField = document.getElementById("MATIC").value;
            const govField = document.getElementById("GOV").value;

            if(govField < 0.01) {
                alert("Minimum of 0.01 GOV has to be bought");
                return;
            }
            setLoading(true);
            try {
                const response = await exchangeContract.methods.buy(parseInt(parseFloat(govField) * 10 ** 2)).send({from: accounts[0], value: parseInt(parseFloat(ethField) * 10**18)});
            } catch (error) {
                console.log('Error-Exchange-BuyGov', error.message)
            }
            setLoading(false);
        } else {
            // Sell tokens
            const ethField = document.getElementById("MATIC").value;
            const govField = document.getElementById("GOV").value;

            if(govField.value < 0.01) {
                alert("Minimum of 0.01 GOV has to be sold");
                return;
            }
            setLoading(true);
            try {
                const approve = await govContract.methods.approve("0xF95050fdE7496e202B418F6AE19ae0f91FAcd310", parseInt(parseFloat(govField) * 10**2)).send({from: accounts[0]});

                const response = await exchangeContract.methods.sell(parseInt(parseFloat(govField) * 10 ** 2)).send({from: accounts[0]});
            } catch (error) {
                console.log('Error-Exchange-SellGov', error.message)
            }
            setLoading(false);
        }
    }

    if (isLoading) {
        return <Loading page="home" />;
    }

    return (
        <div className="container exchange-page">
            <div className="heading title">Swap</div>
            <div className="exchange-box" >
                <div className="label">From</div>
                <Box height="10" />
                <div className="textfield" data-token={token1.symbol} >
                    <input id={token1.symbol} onChange={onInputChange} type="number" placeholder={token1.placeholder} />
                </div>

                <Box height="15"></Box>

                <div onClick={switchTokens} className="switch-btn clickable">
                    <img height="25px" src="/mobile-data.png" alt="Swap Icon" />
                </div>

                <div className="label">To</div>
                <Box height="10" />
                <div className="textfield" data-token={token2.symbol}>
                    <input id={token2.symbol} onChange={onInputChange} type="number" placeholder={token2.placeholder} />
                </div>

                <Box height="30"></Box>

                <button className="clickable" onClick={handleExchange}>{token1.symbol == "MATIC" ? "Buy GOV" : "Sell GOV"}</button>
            </div>
        </div>
    );
}

export default ExchangePage;