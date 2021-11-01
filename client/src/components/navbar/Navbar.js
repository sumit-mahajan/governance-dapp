import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useConnection } from '../connection_provider';
import { Box } from '../utils/Box';
import Chip from '../utils/chip/Chip';
import './navbar.scss'

function Navbar() {
    const { connectionState, setConnectionState, connectWallet } = useConnection();
    const { web3, accounts, networkName } = connectionState;

    const history = useHistory();

    useEffect(() => {
        // Select proper nav-option on load
        if (window.location.href.split("/").at(-1) === "") {
            document.getElementById('e').setAttribute('class', 'nav-option nav-option-c');
        } else {
            document.getElementById('g').setAttribute('class', 'nav-option nav-option-c');
        }

        // On nav-option click
        Array.from(document.getElementsByClassName('nav-option')).forEach(element => {
            element.addEventListener('click', () => {
                document.getElementsByClassName('nav-option-c')[0].setAttribute('class', 'nav-option')
                element.setAttribute('class', 'nav-option nav-option-c')
            })
        });
    }, []);

    return (
        <div>
            <nav className="no-select">
                <div className="logo">GovDAO</div>

                <div className="nav-menu">
                    <Box width="70" />

                    <div id="e" onClick={() => { history.push('/') }} className="nav-option">Exchange</div>

                    <Box width="20" />

                    <div id="g" onClick={() => { history.push('/governance') }} className="nav-option">Governance</div>
                </div>

                <div className="nav-btn-flex">
                    <Chip bgColor="var(--accent)" textColor="white" content={networkName} />

                    <Box width="20" />

                    {accounts.length > 0 ?
                        <Chip bgColor="var(--accent)" textColor="white" content={accounts[0]} /> :
                        <Chip
                            onclick={connectWallet}
                            bgColor="var(--accent)" textColor="white"
                            content="Connect"
                        />
                    }

                </div>
            </nav>
        </div>
    );
}

export default Navbar;