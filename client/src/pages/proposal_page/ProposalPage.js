import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Box } from '../../components/Box';
import Loading from '../../components/loading/Loading';
import { useConnection } from '../../connection_provider';
import './proposal_page.scss';

function ProposalPage() {
    const { connectionState, setConnectionState } = useConnection();
    const { web3, accounts } = connectionState;

    const navigate = useNavigate();

    // To avoid sending multiple transactions while one is already sent
    const [isTransaction, setTransaction] = useState(false);

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
            {/* TODO: Show Vote options */}
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
            <p className="heading">Details</p>
        </div>
    );
}

export default ProposalPage;

