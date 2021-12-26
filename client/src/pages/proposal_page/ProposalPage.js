import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Box } from '../../components/Box';
import Loading from '../../components/loading/Loading';
import { useConnection } from '../../connection_provider';
import './proposal_page.scss';

function ProposalPage() {
    const { connectionState, setConnectionState } = useConnection();
    const { web3, accounts, govContract } = connectionState;

    const navigate = useNavigate();

    // To avoid sending multiple transactions while one is already sent
    const [isTransaction, setTransaction] = useState(false);

    useEffect(() => {
        Array.from(document.querySelectorAll('.option')).forEach((option) => {
            option.addEventListener('click', () => {
                // TODO: Set selected state
                document.querySelector('.selected') && document.querySelector('.selected').setAttribute('class', 'option')
                option.classList.add('selected')
            })
        })
    }, [])

    return (
        <div className="proposal-page">
            <div className="back-btn" onClick={() => {
                // TODO : navigate.goBack() 
            }}>← Back To Overview</div>
            <Box height="20" />
            <div className="p-overview hr-flex">
                <div className="p-left">
                    <p className="heading">Add Lending feature</p>
                    <Box height="10" />
                    <div className="hr-flex">
                        <p className="p-result" style={{ '--res-color': 'var(--primary)' }}>Passed</p>
                        <Box width="20" />
                        <p className="p-date">November 1st, 2021</p>
                    </div>
                </div>
                <p className="p-owner">
                    Creator
                    0x000...000
                </p>
            </div>

            <Box height="30" />

            <div className="options-flex">
                <div className="option"><div>Yea</div></div>
                <div className="option"><div>Nay</div></div>
            </div>

            <Box height="20" />

            <div className="options-flex">
                <div className="textfield">
                    <input type="number" placeholder="Number of Votes" />
                </div>

                <button className="clickable">Vote</button>
            </div>

            <div className="p-grid">
                <div className="votes-card">
                    <div className="card-title">
                        <div className="hr-flex">
                            <p>For</p>
                            <p>500 votes</p>
                        </div>
                        <Box height="15" />
                        <div className="progress-bar"></div>
                    </div>
                    <div className="card-subtitle hr-flex">
                        <p className="subtitle">5 addresses</p>
                        <p className="subtitle">votes</p>
                    </div>
                    <div className="address-tile">
                        <p>Sumit</p>
                        <p>100 votes</p>
                    </div>
                    <div className="address-tile">
                        <p>Sumit</p>
                        <p>100 votes</p>
                    </div>
                    <div className="address-tile">
                        <p>Sumit</p>
                        <p>100 votes</p>
                    </div>
                    <div className="address-tile">
                        <p>Sumit</p>
                        <p>100 votes</p>
                    </div>
                    <div className="address-tile">
                        <p>Sumit</p>
                        <p>100 votes</p>
                    </div>
                </div>
                <div className="votes-card">
                    <div className="card-title">
                        <div className="hr-flex">
                            <p>Against</p>
                            <p>100 votes</p>
                        </div>
                        <Box height="15" />
                        <div className="progress-bar"></div>
                    </div>
                    <div className="card-subtitle hr-flex">
                        <p className="subtitle">1 addresses</p>
                        <p className="subtitle">votes</p>
                    </div>
                    <div className="address-tile">
                        <p>Sumit</p>
                        <p>100 votes</p>
                    </div>
                </div>
            </div>
            <div className="hr-flex">
                <button className='clickable'>Cancel Proposal</button>
                <button className='clickable'>Declare Result</button>
            </div>
            <Box height="30" />
            <p className="heading">Description</p>
            <Box height="20" />
            <p className='description'>Sample description</p>
            <Box height="20" />
        </div>
    );
}

export default ProposalPage;

