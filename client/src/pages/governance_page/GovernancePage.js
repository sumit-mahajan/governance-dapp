import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import './governance_page.scss';
import Loading from '../../components/loading/Loading';
import { Box } from '../../components/Box';
import { useNavigate } from 'react-router';
import { useConnection } from '../../connection_provider';

function GovernancePage() {
    const { connectionState, setConnectionState } = useConnection();
    const { accounts, govContract } = connectionState;

    const [isLoading, setLoading] = useState(false);

    const navigate = useNavigate();

    // List of polls for home page
    const [proposalList, setProposalList] = useState([]);

    useEffect(() => {
        // fetchData();
    }, []);

    // On accounts changed Refetch
    useEffect(() => {
        // fetchData();
    }, [accounts]);

    if (isLoading) {
        return <Loading page="home" />;
    }

    return (
        <div className="g-page">
            <div className="hr-flex">
                <h3 className="heading">Governance Proposals</h3>
                <button className="clickable" onClick={() => { navigate('/governance/create_proposal') }}>
                    Create Proposal
                </button>
            </div>
            {/* TODO: Stats here */}
            <div className="p-list">
                <div className="subtitle">All Proposals</div>
                <div className="p-list-tile" onClick={() => { navigate('/governance/proposal/2') }}>
                    <div className="p-left">
                        <p className="p-title">Redesign UX</p>
                        <Box height="10" />
                        <div className="hr-flex">
                            <p className="p-result" style={{ '--res-color': 'var(--primary)' }}>Live</p>
                            <Box width="20" />
                            <p className="p-date">November 1st, 2021</p>
                        </div>
                    </div>
                    <p className="p-status">Voting</p>
                </div>
                <div className="p-list-tile" onClick={() => { navigate('/governance/proposal/1') }}>
                    <div className="p-left">
                        <p className="p-title">Collateral limit 80%</p>
                        <Box height="10" />
                        <div className="hr-flex">
                            <p className="p-result" style={{ '--res-color': 'rgba(0,0,0,0.5)' }}>Failed</p>
                            <Box width="20" />
                            <p className="p-date">November 1st, 2021</p>
                        </div>
                    </div>
                    <p className="p-status">Cancelled</p>
                </div>
                <div className="p-list-tile" onClick={() => { navigate('/governance/proposal/2') }}>
                    <div className="p-left">
                        <p className="p-title">Add Lending feature</p>
                        <Box height="10" />
                        <div className="hr-flex">
                            <p className="p-result" style={{ '--res-color': 'var(--primary)' }}>Passed</p>
                            <Box width="20" />
                            <p className="p-date">November 1st, 2021</p>
                        </div>
                    </div>
                    <p className="p-status">Executed</p>
                </div>
                <div className="p-list-tile"></div>
                <div className="p-list-tile"></div>
            </div>
        </div>

    );
}

export default GovernancePage;
