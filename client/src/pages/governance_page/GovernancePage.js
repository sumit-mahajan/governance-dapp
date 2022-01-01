import React, { PureComponent, useEffect, useState } from 'react';
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
    const stateValues = ["Active","Cancelled","Accepted","Rejected"];
    const navigate = useNavigate();

    // List of polls for home page
    const [proposalList, setProposalList] = useState([]);

    async function fetchData() {
        if (govContract != null) {
          setLoading(true);
                
          // Fetch number of polls
          const proposalCount = await govContract.methods.proposalCount().call();
    
          // Fetch all polls overview
          let tempList = [];

          for (let i = proposalCount; i > 0; i--) {
            const proposal = await govContract.methods
              .proposals(i)
              .call();
            const state = await govContract.methods
              .state(i)
              .call();
            proposal.index = i;
            proposal.state = stateValues[state];
            tempList.push(proposal);
          }
          setProposalList(tempList);
    
          setLoading(false);
        }
      }


    useEffect(() => {
        fetchData();
    }, []);

    // On accounts changed Refetch
    useEffect(() => {
        fetchData();
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
                {proposalList.map((proposal, idx) => (
                <div className="p-list-tile" onClick={() => { navigate(`/governance/proposal/${proposal.index}`) }}>
                    <div className="p-left">
                        <p className="p-title">{proposal.title}</p>
                        <Box height="10" />
                        <div className="hr-flex">
                            <p className="p-result" style={{ '--res-color': 'var(--primary)' }}>{proposal.state}</p>
                            <Box width="20" />
                            <p className="p-date">{ new Date(parseInt(proposal.dateOfCreation) * 1000).toLocaleString('default', {month: 'long', day: '2-digit', year:'numeric'})  }</p>
                        </div>
                    </div>
                    <p className="p-status">Voting</p>
                </div>
                ))}
                <div className="p-list-tile"></div>
                <div className="p-list-tile"></div>
            </div>
        </div>

    );
}

export default GovernancePage;
