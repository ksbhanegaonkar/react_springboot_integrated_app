import React,{Component} from 'react';
import {BrowserRouter as Router,NavLink,Redirect,Route,Switch,Link } from 'react-router-dom';
import './WelcomePage.css';

class WelcomePage extends Component {
  state={
    userStatus:false
  }
  render(){
  return (
    <div>

<table>
  <tr>
    <th>Type</th>
    <th>Link</th>
  </tr>
  <tr>
    <td>Token counter 0</td>
    <td><Link to={"/tokencounter/0"}>Link</Link></td>
  </tr>

  <tr>
    <td>Token counter 1</td>
    <td><Link to={"/tokencounter/1"}>Link</Link></td>
  </tr>


  <tr>
    <td>Token counter 2</td>
    <td><Link to={"/tokencounter/2"}>Link</Link></td>
  </tr>

  <tr>
    <td>Token counter 3</td>
    <td><Link to={"/tokencounter/3"}>Link</Link></td>
  </tr>

  <tr>
    <td>Token counter 4</td>
    <td><Link to={"/tokencounter/4"}>Link</Link></td>
  </tr>

  <tr>
    <td>Premium service counter 0</td>
    <td><Link to={"/premiumservicecounter/0"}>Link</Link></td>
  </tr>

  <tr>
    <td>Premium service counter 1</td>
    <td><Link to={"/premiumservicecounter/1"}>Link</Link></td>
  </tr>

  
  <tr>
    <td>Service counter 0</td>
    <td><Link to={"/servicecounter/0"}>Link</Link></td>
  </tr>

  <tr>
    <td>Service counter 1</td>
    <td><Link to={"/servicecounter/1"}>Link</Link></td>
  </tr>

  <tr>
    <td>Service counter 2</td>
    <td><Link to={"/servicecounter/2"}>Link</Link></td>
  </tr>

  <tr>
    <td>Service counter 3</td>
    <td><Link to={"/servicecounter/3"}>Link</Link></td>
  </tr>

  <tr>
    <td>Service counter 4</td>
    <td><Link to={"/servicecounter/4"}>Link</Link></td>
  </tr>

  <tr>
    <td>Service counter 5</td>
    <td><Link to={"/servicecounter/5"}>Link</Link></td>
  </tr>

  <tr>
    <td>Customer console</td>
    <td><Link to={"/customerconsole"}>Link</Link></td>
  </tr>

</table>    


       
    </div>
  );
  }


}

export default WelcomePage;
