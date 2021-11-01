import React, { useEffect, useState, useRef } from 'react';
import { useConnection } from '../../components/connection_provider';
import { Box } from '../../components/utils/Box';
import Loading from '../../components/utils/loading/Loading';

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

function CreateProposal(props) {
    const { connectionState, setConnectionState } = useConnection();
    const { accounts, appContract } = connectionState;
    const { openMenu, setOpenMenu } = props;

    // Poll Data input 
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [optionList, setOptionList] = useState(["Yae", "Nah"]);
    const [duration, setDuration] = useState("60"); // 5 minutes = 300 seconds

    // For validation errors
    const [error, setError] = useState({ title: null, description: null, optionIndex: null, sameOption: null, addField: null });

    // To avoid sending multiple transactions while one is already sent
    const [isTransaction, setTransaction] = useState(false);

    const prevList = usePrevious(optionList) || optionList;

    // Whenever option is edited or added or removed from optionList
    useEffect(() => {
        // Array.from(document.getElementsByClassName('option-field')).map((element, idx) => {
        //     // Set values for options from optionList
        //     element.setAttribute('value', optionList[idx]);
        //     // Focus and select only when new option added
        //     if (prevList.length < optionList.length) {
        //         element.focus();
        //         element.select();
        //     }
        //     return null;
        // });
    }, [optionList]);

    // const handleCreate = async () => {
    //     setError({});
    //     let optionMap = {};
    //     var t = false, d = false, s = false, n = false, o = -1;
    //     // Check if title empty
    //     if (title === "") {
    //         t = true;
    //     }
    //     // Check if description empty
    //     if (description === "") {
    //         d = true;
    //     }
    //     // Check if optionList empty
    //     if (optionList.length === 0) {
    //         n = true;
    //     }
    //     for (var i = 0; i < optionList.length; i++) {
    //         // Check if option duplicate
    //         if (optionMap[optionList[i]]) {
    //             s = true;
    //             o = i;
    //             break;
    //         }
    //         // Check if option empty
    //         if (optionList[i] === "") {
    //             o = i;
    //             break;
    //         }
    //         optionMap[optionList[i]] = true;
    //     }
    //     // In any case
    //     if (t || d || s || n || o !== -1) {
    //         setError({
    //             title: t === true && 'Title Empty',
    //             description: d === true && 'Description Empty',
    //             optionIndex: o,
    //             sameOption: s,
    //             addField: n === true && 'No options provided'
    //         });
    //         return;
    //     }

    //     try {
    //         if (!isTransaction) {
    //             setTransaction(true);
    //             // Deploy poll contract
    //             console.log(parseInt(duration))
    //             const transaction = await appContract.methods
    //                 .createPoll(title, description, optionList, parseInt(duration))
    //                 .send({ from: accounts[0] });

    //             // Access logs from transaction
    //             const event = transaction.events.PollCreated.returnValues;

    //             //TODO: show snackbar 
    //             console.log('Poll contract deployed at ' + event.pollAddress + ' by ' + event.ownerAddress);

    //             // Close Add Poll overlay
    //             setOpenMenu(false);

    //             let optionObjectList = [];
    //             optionList.forEach(element => {
    //                 optionObjectList.push({ name: element, count: 0 });
    //             });

    //             // Redirect to that poll page
    //             setConnectionState({
    //                 ...connectionState,
    //                 poll: {
    //                     pollAddress: event.pollAddress,
    //                     title,
    //                     description,
    //                     deadline: Math.round((new Date()).getTime() / 1000) + duration,
    //                     nOptions: optionList.length,
    //                     totalVotes: 0,
    //                     hasUserVoted: false,
    //                     isResultAnnounced: false,
    //                     optionList: optionObjectList
    //                 }
    //             });
    //             setTransaction(false);
    //         }
    //     } catch (err) {
    //         setTransaction(false);
    //         setError({ ...error, button: 'Denied Metmask Transaction signature' })
    //         console.log('Error while creating poll contract', err);
    //     }
    // }

    return (
        <div></div>
        // <div>
        //     {isTransaction && <div className="backdrop" style={{ zIndex: 3 }}>
        //         <Loading />
        //     </div>}
        //     <div className="backdrop"></div>
        //     <div className="add-poll">
        //         {openMenu && accounts.length === 0 && <ConnectOverlay />}

        //         <Box height="100" />

        //         <h2 className="heading">Add Poll</h2>

        //         <Box height="30" />

        //         {/* Title field */}
        //         <div className="textfield">
        //             <p className="label">Title</p>
        //             <input
        //                 type="text"
        //                 id="title-field"
        //                 className="textbox"
        //                 placeholder="Poll Title"
        //                 onChange={(event) => { setTitle(event.target.value); setError({ ...error, title: null }) }}
        //                 onKeyDown={(e) => { if (e.key === 'Enter') { handleCreate() } }} required
        //             />
        //         </div>
        //         {error.title && <div className="error-field">{error.title}</div>}

        //         <Box height="10" />

        //         {/* Description field */}
        //         <div className="textfield">
        //             <p className="label">Description</p>
        //             <textarea
        //                 className="textarea"
        //                 placeholder="What's this poll about ?"
        //                 onChange={(event) => {
        //                     setDescription(event.target.value);
        //                     setError({ ...error, description: null })
        //                 }}
        //                 onKeyDown={(e) => { if (e.key === 'Enter') { handleCreate() } }} required
        //             />
        //         </div>
        //         {error.description && <div className="error-field">{error.description}</div>}


        //         <Box height="10" />

        //         <div className="hr-flex period">
        //             <p className="period-text">Voting period</p>
        //             <select value={duration} onChange={(e) => { setDuration(e.target.value); }}>
        //                 <option value="60">1 minute</option>
        //                 <option value="300">5 minutes</option>
        //                 <option value="3600">1 hour</option>
        //                 {/* <option value="300">6 hours</option>
        //             <option value="300">12 hours</option>
        //             <option value="300">1 day</option>
        //             <option value="300">2 days</option> */}
        //             </select>
        //         </div>


        //         <Box height="20" />

        //         <p className="label">Options</p>

        //         <Box height="5" />

        //         {/* List of options */}
        //         {optionList.map((element, idx) =>
        //             <div key={idx} className="hr-flex option">
        //                 <div className="option-no">{(idx + 1)}</div>
        //                 {/* Option textfield */}
        //                 <input
        //                     className="option-field"
        //                     type="text"
        //                     placeholder={"Option " + (idx + 1)}
        //                     onChange={(event) => {
        //                         let tempList = optionList;
        //                         tempList[idx] = event.target.value
        //                         setOptionList(tempList);
        //                         setError({ ...error, optionIndex: error.optionIndex === idx ? -1 : error.optionIndex })
        //                     }}
        //                     required
        //                 />
        //                 {/* Remove icon */}
        //                 {<div className='delete-option' onClick={() => {
        //                     setOptionList(optionList.filter((item, index) => index !== idx));
        //                 }}>X</div>}
        //                 {/* To show validation errors */}
        //                 {error.optionIndex !== idx ? '' :
        //                     error.sameOption ? <div className="error-field">Duplicate</div>
        //                         : <div className="error-field">Empty</div>}
        //             </div>
        //         )}
        //         {/* Disabled textfield which adds option onclick like google form */}
        //         <div key={optionList.length} className="hr-flex option disabled">
        //             <div className="option-no">{(optionList.length + 1)}</div>
        //             <input
        //                 className="option-field-d"
        //                 type="text"
        //                 placeholder={"Add Option"}
        //                 onClick={() => {
        //                     let tempList = optionList.concat('Option ' + (optionList.length + 1));
        //                     setOptionList(tempList);
        //                 }}
        //             />
        //             {error.addField && <div className="error-field">{error.addField}</div>}

        //         </div>


        //         <Box height="20" />

        //         <button className="clickable" onClick={handleCreate}>Create</button>
        //         {error.button && <div className="error-field">{error.button}</div>}
        //     </div>
        // </div>
    );
}

export default CreateProposal;
