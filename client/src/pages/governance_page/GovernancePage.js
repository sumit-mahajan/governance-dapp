import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import './governance_page.scss';
import Loading from '../../components/utils/loading/Loading';
import { Box } from '../../components/utils/Box';
import { useConnection } from '../../components/connection_provider.js';
import { useHistory } from 'react-router';

function GovernancePage() {
    const { connectionState, setConnectionState } = useConnection();
    const { accounts, govContract } = connectionState;

    const [isLoading, setLoading] = useState(false);

    const history = useHistory();

    // List of polls for home page
    const [proposalList, setProposalList] = useState([]);

    // async function fetchData() {
    //     if (appContract != null) {
    //         setLoading(true);

    //         // Fetch number of polls
    //         const nPolls = await appContract.methods.nPolls().call();

    //         // Fetch all polls overview
    //         let tempList = [];
    //         for (let i = 0; i < nPolls; i++) {
    //             const poll = await appContract.methods.getPollOverview(i, accounts.length > 0 ? accounts[0] : "0x0000000000000000000000000000000000000000").call();
    //             poll.index = i;
    //             poll.isResultAnnounced = new Date(poll.deadline * 1000).getTime() < new Date().getTime()
    //             tempList.push(poll);
    //         }
    //         setProposalList(tempList);

    //         setLoading(false);
    //     }
    // }

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
                <button className="clickable" onClick={() => { history.push('/governance/create_proposal') }}>
                    Create Proposal
                </button>
            </div>
            {/* TODO: Stats here */}
            <div className="p-list">
                <div className="subtitle">All Proposals</div>
                <div className="p-list-tile" onClick={() => { history.push('/governance/proposal/2') }}>
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
                <div className="p-list-tile" onClick={() => { history.push('/governance/proposal/1') }}>
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
                <div className="p-list-tile" onClick={() => { history.push('/governance/proposal/2') }}>
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

        // <div className="container">
        //     {/* {accounts !== undefined ? 'Hi ' + accounts[0] : 'Connect'} */}
        //     <Box height="40" />

        //     <div className='heading'>Here are all the polls</div>

        //     <Box height="40" />

        //     {proposalList.length !== 0 ?
        //         <div className="poll-grid">
        //             {proposalList.map((poll, idx) => {
        //                 return (<div key={idx} className="poll-card clickable" onClick={() => { setConnectionState({ ...connectionState, poll: poll }) }}>
        //                     <h3 className="title">{poll.title}</h3>
        //                     <p className="description">{poll.description}</p>
        //                     <div className="hr-flex">
        //                         <Chip bgColor={'var(--primary)'} textColor="white" content={poll.pollAddress} />
        //                         <Box width="10"></Box>
        //                         <Chip bgColor={poll.isResultAnnounced ? 'red' : 'green'} textColor="white" content={poll.isResultAnnounced ? 'Ended' : 'Live'} />
        //                     </div>
        //                     <p className="description">{poll.totalVotes} have voted</p>
        //                     {poll.isResultAnnounced ? <p className="declared">Results declared</p> : poll.hasUserVoted ? <p className="voted">You have already voted</p> : <div className="vote-div">Vote</div>}
        //                 </div>);
        //             })}
        //         </div>
        //         : <div className="no-polls">No polls</div>}

        //     <Box height="30" />
        // </div>
    );
}

export default GovernancePage;
