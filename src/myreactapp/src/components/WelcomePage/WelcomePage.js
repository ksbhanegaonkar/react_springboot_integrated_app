import React,{Component} from 'react';
import {BrowserRouter as Router,NavLink,Redirect,Route,Switch,Link } from 'react-router-dom';
import {getRequest} from '../Utils/RestUtils';
import './WelcomePage.css';
import { get } from 'https';
import LoadingScreen from '../LoadingScreen/LoadingScreen';


class WelcomePage extends Component {
  state={
    tokenCounter:1,
    serviceCounter:1,
    premiumServiceCounter:1,
    isLoading:false
    
  }

  componentDidMount(){
    this.setState({isLoading:true});
    getRequest("/getcounterinfo",(data)=>{
      this.setState({tokenCounter:data.tokenCounter,
        serviceCounter:data.serviceCounter,
        premiumServiceCounter:data.premiumServiceCounter,
      isLoading:false});
    });


  }

renderTokenCounter(){

  let tokenCounters = [];
  for(let i=0;i<this.state.tokenCounter;i++){
    tokenCounters.push(
      <tr key={i}>
        <td>Token Counter <b>TC-{i}</b></td>
        <td><Link key={"TC-"+i} to={"/tokencounter/"+i}>Link</Link></td>
      </tr>
    );
  }
 return tokenCounters;

}
renderServiceCounter(){
  let tokenCounters = [];
  for(let i=0;i<this.state.serviceCounter;i++){
    tokenCounters.push(
      <tr key={i}>
        <td>Service Counter <b>NC-{i}</b></td>
        <td><Link key={"NC-"+i} to={"/servicecounter/"+i}>Link</Link></td>
      </tr>
    );
  }
 return tokenCounters;

}
renderPremiumServiceCounter(){
  let tokenCounters = [];
  for(let i=0;i<this.state.premiumServiceCounter;i++){
    tokenCounters.push(
      <tr key={i}>
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
<LoadingScreen isLoading={this.state.isLoading}></LoadingScreen>
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
