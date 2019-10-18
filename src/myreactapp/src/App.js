import React,{Component} from 'react';
import {BrowserRouter as Router,NavLink,Redirect,Route,Switch} from 'react-router-dom';

import './App.css';
import TokenCounter from './components/TokenCounter/TokenCounter';
import AdminConsole from './components/AdminConsole/AdminConsole';
import CustomerConsole from './components/CustomerConsole/CustomerConsole';
import ServiceCounter from './components/ServiceCounter/ServiceCounter';

class App extends Component {
  state={
    userStatus:false
  }
  render(){
  return (
    <Router>
        <Switch>
          <Route path="/adminconsole" exact strict 
           render={(props) => <AdminConsole {...props} name={"Admin Console"} />}>
          </Route>

          <Route path="/tokencounter/:id" exact strict 
           render={(props) => <TokenCounter {...props} name={"Token counter"}/>}>
          </Route>

          <Route path="/servicecounter/:id" exact strict 
           render={(props) => <ServiceCounter {...props} name={"Normal service counter"} isPremium={false}/>}>
          </Route>

          <Route path="/premiumservicecounter/:id" exact strict 
           render={(props) => <ServiceCounter {...props} name={"Premium service Counter"} isPremium={true}/>}>
          </Route>

          <Route path="/customerconsole" exact strict 
           render={(props) => <CustomerConsole {...props} name={"Customer Console"} />}>
          </Route>

        </Switch>
    </Router>
  );
  }


}

export default App;
