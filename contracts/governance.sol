// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
// pragma solidity ^0.6.0;
interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

//     event Transfer(address indexed from, address indexed to, uint256 value);
//     event Approval(address indexed owner, address indexed spender, uint256 value);
// 
}
contract GOVToken is IERC20 {

    string public constant name = "GOVToken";
    string public constant symbol = "GOV";
    uint8 public constant decimals = 2; 

    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    event Transfer(address indexed from, address indexed to, uint tokens);

    mapping(address => uint) balances;
    mapping(address => uint) locked;

    mapping(address => mapping (address => uint)) allowed;
    
    uint _totalSupply = 10000;
    address public creator;

    using SafeMath for uint;


   constructor() public {  
	    balances[msg.sender] = _totalSupply*20/100;
	    balances[address(this)] = _totalSupply*40/100;
	    creator = msg.sender;
    }  
    modifier onlyCreator {
        require(
            msg.sender == creator,
            "Only creator can call this function"
        );
        _;
    }
    function totalSupply() public override view returns (uint256) {
	    return _totalSupply;
    }
    
    function balanceOf(address tokenOwner) public override view returns (uint256) {
        return balances[tokenOwner];
    }
    function lockedOf(address tokenOwner) public view returns (uint256) {
        return locked[tokenOwner];
    }
    
    function transfer(address receiver, uint numTokens) public override returns (bool) {
        require(numTokens <= balances[msg.sender]-locked[msg.sender], "Governonce::transfer:Insufficient tokens");
        balances[msg.sender] = balances[msg.sender].sub(numTokens);
        balances[receiver] = balances[receiver].add(numTokens);
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }
    function transferFromContract(address receiver, uint numTokens) internal returns (bool) {
        require(numTokens <= balances[address(this)], "Governonce::transferFromContract:Insufficient tokens");
        balances[address(this)] = balances[address(this)].sub(numTokens);
        balances[receiver] = balances[receiver].add(numTokens);
        emit Transfer(address(this), receiver, numTokens);
        return true;
    }

    function approve(address delegate, uint numTokens) public override returns (bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    function allowance(address owner, address delegate) public override view returns (uint256) {
        return allowed[owner][delegate];
    }

    function transferFrom(address owner, address receiver, uint numTokens) public override returns (bool) {  
        require(numTokens <= allowed[owner][msg.sender], "Governonce::transferFrom:Not Allowed");
        require(numTokens <= balances[owner]-locked[owner], "Governonce::transferFrom:Insufficient tokens");  
    
        balances[owner] = balances[owner].sub(numTokens);
        allowed[owner][msg.sender] = allowed[owner][msg.sender].sub(numTokens);
        balances[receiver] = balances[receiver].add(numTokens);
        emit Transfer(owner, receiver, numTokens);
        return true;
    }
    
    function mint(uint256 numTokens) public onlyCreator {
        require(msg.sender != address(0), "Governonce::mint: mint to the zero address");
        _totalSupply += numTokens;
        balances[msg.sender] += numTokens;
        emit Transfer(address(0), msg.sender, numTokens);
    }

    function burn(uint256 numTokens) public {
        require(msg.sender != address(0), "Governonce::burn: burn from the zero address");
        require(balances[msg.sender]-locked[msg.sender]>= numTokens, "Governonce::burn: burn amount exceeds balance");
        balances[msg.sender] -= numTokens;
        _totalSupply -= numTokens;

        emit Transfer(msg.sender, address(0), numTokens);
    }
    
    uint256 public proposalCount;
    uint256 tokensReqdForProposal = 100;
    uint256 declaringResultReward = 50;
    function quorumVotes() public pure returns (uint) { return 300; }
    
    /// @notice The total number of proposals
     struct Proposal {
        //  Unique id for looking up a proposal
        uint id;

        //  Creator of the proposal
        address proposer;

        //  Current number of votes in favor of this proposal
        uint forVotes;

        //  Current number of votes in opposition to this proposal
        uint againstVotes;

        //  Flag marking whether the proposal has been canceled
        bool canceled;

        //  Flag marking whether the proposal has been announced
        bool announced;
        
        uint voterCount;
        
        // description  of the proposal
        string description;
        
        //title  of the proposal
        string title;
        
        //creation date
        uint dateOfCreation;
        
        //cancellation date or announcement date
        uint date;
       
        // Deadln=ine for voting
        uint deadlineForVoting;
        
    }
     /// @notice Ballot receipt record for a voter
    struct Receipt {
        //  Hether or not a vote has been cast
        bool hasVoted;

        //  Whether or not the voter supports the proposal
        bool support;

        //  The number of votes the voter had, which were cast
        uint votes;
    }
    
     mapping(uint => mapping (address => Receipt)) receipts;
     
     mapping(uint => mapping (uint => address)) voterAddress;
     
     
     /// @notice Possible states that a proposal may be in
    enum ProposalState {
        Active,
        Canceled,
        Accepted,
        Rejected
    }
    
     /// @notice The official record of all proposals ever proposed
    mapping (uint256 => Proposal) public proposals;
    /// @notice An event emitted when a new proposal is created
    event ProposalCreated(uint id, address proposer, string description, string title, uint dateOfCreation);
    
    /// @notice An event emitted when a vote has been cast on a proposal
    event VoteCast(address voter, uint proposalId, bool support, uint votes);
    
    function propose(string memory description, string memory title) external {
        require(balances[msg.sender]-locked[msg.sender] >= tokensReqdForProposal, "Governonce::propose: User doesn't have sufficient token to create a new proposal");
        bool sent = transfer(address(this), tokensReqdForProposal);
        require(sent, "Governonce::propose: Failure in transferring tokens");

        if (proposalCount != 0) {
          ProposalState latestProposalState = state(proposalCount);
          require(latestProposalState != ProposalState.Active, "Governonce::propose: one live proposal at a time, found an already active proposal");
        }

        proposalCount++;
        Proposal memory newProposal = Proposal({
            id: proposalCount,
            proposer: msg.sender,
            description : description,
            forVotes: 0,
            againstVotes: 0,
            canceled: false,
            announced: false,
            deadlineForVoting: block.timestamp + 2 minutes,
            voterCount: 0,
            title: title,
            dateOfCreation: block.timestamp,
            date: block.timestamp
            
            
        });

        proposals[newProposal.id] = newProposal;
        emit ProposalCreated(newProposal.id, msg.sender, description, title, newProposal.dateOfCreation);
        
    }
    
    function getReceipt(uint256 proposalId, address voter) external view returns (Receipt memory) {
        return receipts[proposalId][voter];
    }

    function state(uint256 proposalId) public view returns (ProposalState) {
        require(proposalCount >= proposalId && proposalId > 0, "Governonce::state: invalid proposal id");
        Proposal storage proposal = proposals[proposalId];
        if(proposal.canceled) {
            return ProposalState.Canceled;
        }
        else if(proposal.announced) {
            if(proposal.forVotes>proposal.againstVotes && proposal.forVotes>quorumVotes()){
                return ProposalState.Accepted;
            }
            else{
                return ProposalState.Rejected;
            }

            
        }
        else{
            return ProposalState.Active;   
        }
    }
    
    function castVote(uint256 proposalId, bool support, uint256 votes) external {
        require(proposalCount >= proposalId && proposalId > 0, "Governonce::castVote: invalid proposal id");
        Proposal storage proposal = proposals[proposalId];   
        require(block.timestamp <= proposal.deadlineForVoting, "Governonce::castVote: Voting period has ended");
        require(balances[msg.sender]-locked[msg.sender]>=votes, "Governonce::castVote: User doesn't have sufficient token to vote");
        Receipt storage receipt = receipts[proposalId][msg.sender];
        require((receipt.hasVoted == false || receipt.support == support), "Governance::castVote: You can't cast vote to both outcome");
       
        if(receipt.hasVoted== true){
            receipt.votes = receipt.votes + votes;
        }
        else{
            receipt.hasVoted = true;
            receipt.support = support;
            receipt.votes = votes;
            voterAddress[proposalId][proposal.voterCount] = msg.sender;
            proposal.voterCount++;
        }
        if(support) {
            proposal.forVotes = proposal.forVotes.add(votes);
        }else {
            proposal.againstVotes = proposal.againstVotes.add(votes);
        }
        
        locked[msg.sender]+=votes;
        receipts[proposalId][msg.sender] = receipt;
        emit VoteCast(msg.sender, proposalId, support, votes);
    }
    
    function declareResult(uint256 proposalId) external {
        require(proposalCount >= proposalId && proposalId > 0, "Governonce::declareResult: invalid proposal id");
        Proposal storage proposal = proposals[proposalId];   
        require(block.timestamp > proposal.deadlineForVoting, "Governonce::declareResult: Voting period has not yet ended");
        ProposalState _ProposalState = state(proposalId);
        require(_ProposalState != ProposalState.Canceled, "Governonce::declareResult: Prososal is canceled");
        require(_ProposalState != ProposalState.Accepted && _ProposalState != ProposalState.Rejected, "Governonce::declareResult: Result already announced");
        
        for(uint i=0; i<proposal.voterCount; i++)
        {   
            Receipt storage receipt = receipts[proposalId][voterAddress[proposalId][i]];
            locked[voterAddress[proposalId][i]]-=receipt.votes;
        }
        proposal.announced = true;
        transferFromContract(msg.sender, declaringResultReward); 
        if(proposal.forVotes>proposal.againstVotes && proposal.forVotes>quorumVotes()){
            //winning 
            transferFromContract(proposal.proposer,tokensReqdForProposal);
        }
    }

    function cancelProposal(uint256 proposalId) external {
        require(proposalCount >= proposalId && proposalId > 0, "Governonce::cancelProposal: invalid proposal id");
        Proposal storage proposal = proposals[proposalId];  
        require(msg.sender == proposal.proposer, "Governonce::cancelProposal: only creator can cancel the proposal");
        require(block.timestamp < proposal.deadlineForVoting, "Governonce::cancelProposal: Proposal cannot be Canceled after voting time");
        ProposalState _ProposalState = state(proposalId);
        require(_ProposalState != ProposalState.Canceled, "Governonce::declareResult: Prososal is already canceled");
        proposal.canceled = true;
        for(uint i=0; i<proposal.voterCount; i++)
        {   
            Receipt storage receipt = receipts[proposalId][voterAddress[proposalId][i]];
            locked[voterAddress[proposalId][i]]-=receipt.votes;
        }
    }
}


library SafeMath { 
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
      assert(b <= a);
      return a - b;
    }
    
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
      uint256 c = a + b;
      assert(c >= a);
      return c;
    }
}