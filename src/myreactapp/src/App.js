import React,{Component} from 'react';
import {BrowserRouter as Router,NavLink,Redirect,Route,Switch,Link } from 'react-router-dom';
import './App.css';
import TokenCounter from './components/TokenCounter/TokenCounter';
import AdminConsole from './components/AdminConsole/AdminConsole';
import CustomerConsole from './components/CustomerConsole/CustomerConsole';
import ServiceCounter from './components/ServiceCounter/ServiceCounter';
import WelcomePage from './components/WelcomePage/WelcomePage';

class App extends Component {
  state={
    userStatus:false
  }

  render(){
  return (
    <Router>
         <Link to={"/"}><h2><b>Home</b></h2></Link>
        <Switch>

          <Route path="/"  exact strict
           render={(props) => <WelcomePage {...props} name={"Welcome page"} />}>
          </Route>

          <Route path="/adminconsole" exact strict
           render={(props) => <AdminConsole {...props} name={"Admin Console"} />}>
          </Route>

          <Route path="/tokencounter/:id"  exact  strict
           render={(props) => <TokenCounter {...props} name={"Token counter TC-"}/>}>
          </Route>

          <Route path="/servicecounter/:id"   exact strict
           render={(props) => <ServiceCounter {...props} name={"Service Counter NC-"} type={"Normal"}/>}>
          </Route>

          <Route path="/premiumservicecounter/:id"  exact strict
           render={(props) => <ServiceCounter {...props} name={"Premium Service Counter PC-"} type={"Premium"}/>}>
          </Route>

          <Route path="/customerconsole"   exact strict
           render={(props) => <CustomerConsole {...props} name={"Customer Console"} />}>
          </Route>

        </Switch>
       
    </Router>
  );
  }


}

export default App;
