import React, { useState } from 'react';
import './exchange_page.scss';
import Loading from '../../components/loading/Loading';
import { Box } from '../../components/Box';
import { useConnection } from '../../connection_provider';

function ExchangePage() {
    const { connectionState, setConnectionState } = useConnection();
    const { accounts, govContract } = connectionState;

    const ethToGov = 1000;
    const [token1, setToken1] = useState({
        symbol: "ETH",
        placeholder: 1
    });
    const [token2, setToken2] = useState({
        symbol: "GOV",
        placeholder: 1000
    })

    const switchTokens = () => {
        const temp = token1;
        setToken1(token2);
        setToken2(temp);
        const ethField = document.getElementById("ETH");
        const govField = document.getElementById("GOV");
        const t = ethField.value;
        ethField.value = govField.value;
        govField.value = t;
    }

    const onInputChange = (event) => {
        const ethField = document.getElementById("ETH");
        const govField = document.getElementById("GOV");
        if (event.target.id === "ETH") {
            govField.value = ethField.value * ethToGov;
        } else {
            ethField.value = govField.value / ethToGov;
        }
    }

    return (
        <div className="container exchange-page">
            <div className="heading title">Swap</div>
            <div className="exchange-box" >
                <div className="label">From</div>
                <div className="textfield" data-token={token1.symbol} >
                    <input id={token1.symbol} onChange={onInputChange} type="number" placeholder={token1.placeholder} />
                </div>

                <Box height="5"></Box>

                <div onClick={switchTokens} className="switch-btn clickable">
                    <img height="25px" src="/mobile-data.png" alt="Swap Icon" />
                </div>

                <div className="label">To</div>
                <div className="textfield" data-token={token2.symbol}>
                    <input id={token2.symbol} onChange={onInputChange} type="number" placeholder={token2.placeholder} />
                </div>

                <Box height="20"></Box>

                <button className="clickable">{token1.symbol == "ETH" ? "Buy GOV" : "Sell GOV"}</button>
            </div>
        </div>
    );
}

export default ExchangePage;