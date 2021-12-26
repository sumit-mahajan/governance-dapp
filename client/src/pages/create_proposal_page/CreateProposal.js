import React, { useEffect, useState, useRef } from 'react';
import "./create_proposal.scss";
import { Box } from '../../components/Box';
import Loading from '../../components/loading/Loading';
import { useConnection } from '../../connection_provider';

function CreateProposal(props) {
    const { connectionState, setConnectionState } = useConnection();

    // Poll Data input 
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // For validation errors
    const [error, setError] = useState({ title: null, description: null, button: null });

    // To avoid sending multiple transactions while one is already sent
    const [isTransaction, setTransaction] = useState(false);

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

                <button className="clickable">Submit Proposal</button>
            </div>
        </div>
    );
}

export default CreateProposal;
