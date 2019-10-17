import React,{Component} from 'react';
import {BrowserRouter as Router,NavLink,Redirect,Route,Switch} from 'react-router-dom';

import './App.css';
import TokenCounter from './components/TokenCounter/TokenCounter';
import AdminConsole from './components/AdminConsole/AdminConsole';
import CustomerConsole from './components/CustomerConsole/CustomerConsole';

class App extends Component {
  state={
    userStatus:false
  }
  render(){
  localStorage.removeItem("jwtToken");
  return (
    <Router>
        <Switch>
          <Route path="/adminconsole" exact strict 
           render={(props) => <AdminConsole {...props} name={"Admin Console"} />}>
          </Route>

          <Route path="/counter/:id" exact strict 
           render={(props) => <TokenCounter {...props} name={"Normal token counter"} isPremium={false}/>}>
          </Route>

          <Route path="/premiumcounter/:id" exact strict 
           render={(props) => <TokenCounter {...props} name={"Premium Token Counter"} isPremium={true}/>}>
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
