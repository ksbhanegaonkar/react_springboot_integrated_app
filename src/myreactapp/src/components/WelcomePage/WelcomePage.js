import React,{Component} from 'react';
import {BrowserRouter as Router,NavLink,Redirect,Route,Switch,Link } from 'react-router-dom';
import {getRequest} from '../Utils/RestUtils';
import './WelcomePage.css';
import { get } from 'https';


class WelcomePage extends Component {
  state={
    counterInfo:{"tokenCounter":5,"serviceCounter":5,"premiumServiceCounter":2}
  }

  componentDidMount(){
    // getRequest("/getcounterinfo",
    // (data)=>{
    //   console.log("data is :::::::: "+data);
    //   this.setState({counterInfo:data});
    // }
    // );
    // console.log("data is :::::::: "+this.state.counterInfo.tokenCounter);
  }

renderTokenCounter(){

  let tokenCounters = [];
  for(let i=0;i<this.state.counterInfo.tokenCounter;i++){
    tokenCounters.push(
      <tr>
        <td>Token Counter <b>TC-{i}</b></td>
        <td><Link key={"TC-"+i} to={"/tokencounter/"+i}>Link</Link></td>
      </tr>
    );
  }
 return tokenCounters;

}
renderServiceCounter(){
  let tokenCounters = [];
  for(let i=0;i<this.state.counterInfo.serviceCounter;i++){
    tokenCounters.push(
      <tr>
        <td>Service Counter <b>NC-{i}</b></td>
        <td><Link key={"NC-"+i} to={"/servicecounter/"+i}>Link</Link></td>
      </tr>
    );
  }
 return tokenCounters;

}
renderPremiumServiceCounter(){
  let tokenCounters = [];
  for(let i=0;i<this.state.counterInfo.premiumServiceCounter;i++){
    tokenCounters.push(
      <tr>
        <td>Premium Counter <b>PC-{i}</b></td>
        <td><Link key={"PC-"+i} to={"/premiumservicecounter/"+i}>Link</Link></td>
      </tr>
    );
  }
 return tokenCounters;
}

  render(){
  return (
    <div>

<table>
  <tbody>
  <tr>
    <th>Type</th>
    <th>Link</th>
  </tr>

    {this.renderTokenCounter()}
    {this.renderServiceCounter()}
    {this.renderPremiumServiceCounter()}




  <tr>
    <td>Customer console</td>
    <td><Link to={"/customerconsole"}>Link</Link></td>
  </tr>
  </tbody>
</table>    


       
    </div>
  );
  }


}

export default WelcomePage;
