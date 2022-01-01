import React, { useEffect, useState, useRef } from 'react';
import "./create_proposal.scss";
import { Box } from '../../components/Box';
import Loading from '../../components/loading/Loading';
import { useConnection } from '../../connection_provider';

function CreateProposal(props) {
    const { connectionState, setConnectionState } = useConnection();
    const { web3, accounts, govContract } = connectionState;
    // Poll Data input 
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
 //   useeffect 
    // For validation errors
    const [error, setError] = useState({ title: null, description: null, button: null });

    // To avoid sending multiple transactions while one is already sent
    const [isTransaction, setTransaction] = useState(false);
    
    //let tempList = [];

    const handleproposal = async () => {
        setError({});
        if (title == "" || description=="") {
            setError({ title: "Please fill title", description:"Please fill description"});
            return;
        }
        try {
           let option = await govContract.methods.propose(title,description).send({from:accounts[0]});
           //tempList.push(option);
          } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="container create-proposal">
            <div className="heading title">Create Proposal</div>
            <div className="proposal-box" >
                <div className="label">Title</div>
                <div className="textfield" >
                    <input id="title" onChange={e => setTitle(e.target.value)} type="text" placeholder="Title of Proposal" />
                </div>

                <Box height="10"></Box>

                <div className="label">Desrcription</div>
                <div className="textfield">
                    <textarea id="description" onChange={(e) => setDescription(e.target.value)} rows="10" placeholder="Why should people vote on your proposal?" />
                </div>

                <Box height="20"></Box>

                <button onclassName="clickable" onClick={handleproposal}>Submit Proposal</button>
            </div>
        </div>
    );
}

export default CreateProposal;
