import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useConnection } from './components/connection_provider';

import Navbar from "./components/navbar/Navbar";
import GovernancePage from "./pages/governance_page/GovernancePage";
import ExchangePage from "./pages/exchange_page/ExchangePage";
import CreateProposal from "./pages/create_proposal_page/CreateProposal";
import Loading from "./components/utils/loading/Loading";
import ProposalPage from "./pages/proposal_page/ProposalPage";

function App() {

  const { connectionState } = useConnection();

  const { web3, errors } = connectionState;

  // Mostly due to wrong network
  // if (errors) {
  //   console.log(errors);
  //   alert('errors')
  // }

  // Loading animation while webpage loads contract data
  // if (!web3) {
  //   return <Loading page="app" />;
  // }

  return (
    <div>
      <BrowserRouter history={History}>
        <Navbar />
        <Switch>
          <Route path="/governance/create_proposal" component={CreateProposal} />
          <Route path="/governance/proposal/:index" component={ProposalPage} />
          <Route path="/governance" component={GovernancePage} />
          <Route path="/" component={ExchangePage} />
        </Switch>
      </BrowserRouter>
    </div>
  );

}

export default App;
