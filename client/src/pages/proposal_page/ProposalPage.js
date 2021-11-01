import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useConnection } from '../../components/connection_provider';
import { Box } from '../../components/utils/Box';
import Loading from '../../components/utils/loading/Loading';
import './proposal_page.scss';

function ProposalPage() {
    const { connectionState, setConnectionState } = useConnection();
    const { web3, accounts } = connectionState;

    const history = useHistory();

    // Contract instance
    // const [polc, setpolc] = useState(null);
    // const [error, seterror] = useState({ vote: null });
    // const [isLoading, setLoading] = useState(false);

    // To avoid sending multiple transactions while one is already sent
    const [isTransaction, setTransaction] = useState(false);

    //Currently Selected Option
    // const [pollData, setPollData] = useState(poll);
    // const [voteOption, setvoteOption] = useState(null);

    // Only to fetch list of options. Rest of the data comes from HomePage overview
    async function fetchData() {
        // const pollContract = await new web3.eth.Contract(Poll.abi, poll.pollAddress);
        // setpolc(pollContract);

        // if (pollContract != null) {
        //     setLoading(true);

        //     if (!poll.isResultAnnounced) {
        //         // Set options
        //         let tempList = [];
        //         for (let i = 0; i < poll.nOptions; i++) {
        //             let option = await pollContract.methods.getOption(i).call();
        //             tempList.push(option);
        //         }

        //         poll.optionList = tempList;
        //         setPollData(poll);
        //     } else {
        //         // Set results
        //         let tempList = [];
        //         for (let i = 0; i < poll.nOptions; i++) {
        //             let option = await pollContract.methods.getOption(i).call();
        //             tempList.push(option);
        //         }

        //         // Get winner
        //         // const winner = await pollContract.methods.getWinner().call();

        //         // poll.winner = winner;
        //         poll.optionList = tempList;
        //         console.log(poll.optionList)
        //         setPollData(poll);
        //     }

        //     setLoading(false);
        // }
    }

    useEffect(() => {
        // Fetch only optionList when coming from HomePage. 
        // If coming from AddOverlay, all the information is already there
        // if (!poll.optionList) {
        //     fetchData();
        // }
    }, []);

    // Vote
    const handleVote = async () => {
        // seterror({})
        // if (voteOption == null) {
        //     seterror({ vote: "Please select an option" });
        //     return;
        // }
        // try {
        //     // To avoid sending multiple transactions
        //     if (!isTransaction) {
        //         setTransaction(true);

        //         await polc.methods
        //             .vote(voteOption)
        //             .send({ from: accounts[0] });

        //         setConnectionState({ ...connectionState, poll: 'Home' });

        //         setTransaction(false);
        //     }
        // } catch (error) {
        //     setTransaction(false);
        //     console.log("Error", formatError(error));
        //     seterror({ vote: formatError(error) });
        // }
    };

    // if (!web3 || isLoading) {
    //     return <Loading page="poll" />;
    // }

    return (
        <div className="proposal-page">
            <div className="back-btn" onClick={() => { history.goBack() }}>Back To Overview</div>
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
                    Owner
                    0x3f7...9B2
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
        //  If a transaction is already sent 
        // {isTransaction && <div className="backdrop" style={{ zIndex: 3 }}>
        //     <Loading />
        // </div>}
        // If not connected to metamask
        // {accounts.length === 0 && <ConnectOverlay />}

        // <Box height="40" />

        // <h2 className="heading">{pollData.title}</h2>

        // <Box height="30" />

        // <p className="description">{pollData.description}</p>

        // <Box height="40" />
        // {!pollData.isResultAnnounced ?
        //     <div>
        //         <div className="options-parent">
        //             {pollData.optionList && pollData.optionList.map((option, index) => (
        //                 <div
        //                     key={index}
        //                     className={
        //                         voteOption === index ? "options-div selected" : "options-div clickable"
        //                     }
        //                     onClick={() => setvoteOption(index)}
        //                 >
        //                     {option.name}
        //                 </div>
        //             ))}
        //         </div>

        //         <Box height="40" />

        //         {poll.hasUserVoted ? 'Already voted' : <button className="clickable " onClick={handleVote}>
        //             Vote
        //         </button>}
        //         {error.vote && <div className="error-field">{error.vote}</div>}

        //         <Box height="30" />

        //     </div>
        //     : <div>
        //         {pollData.optionList && pollData.optionList.map((option, idx) => <div key={idx}>
        //             <p>{option.name}<span>{'    ' + option.count}</span></p>
        //         </div>)}
        // </div>} 
    );
}

export default ProposalPage;

