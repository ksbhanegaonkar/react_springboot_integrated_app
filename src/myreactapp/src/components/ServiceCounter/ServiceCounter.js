import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import {postRequest,getRequest,postRequestEveryInterval} from '../Utils/RestUtils';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import TokenDisplay from "../TokenDisplay/TokenDisplay";
import './ServiceCounter.css';
import LoadingScreen from "../LoadingScreen/LoadingScreen";

class ServiceCounter extends Component{
  state={
    userName:'',
    isPremium:false,
    successMessage:'',
    token:{},
    isLoading:false,
    counterOwnerId:-1,
    isCounterOwnerLoggedIn:false

  }
  constructor(props){
    super(props);
    
  }

componentDidMount(){
  this.refreshCounter();
}
  validateForm() {
    return this.state.userName.length > 0 && this.state.pass.length > 0;
  }

  setUsername(name){
    this.setState({userName:name});
  }
  setPassword(pass){
    this.setState({pass:pass});
  }

  handleSubmit(){
    if(this.state.counterOwnerId !== -1){
      this.setState({isCounterOwnerLoggedIn:true});
    }
  }
  refreshCounter(){
    this.setState({isLoading:true});
     postRequest('/getassignedtoken',{"counterId":this.props.match.params.id,"type":this.props.type},
    (token)=>{
      // console.log(" token.assignedCounterId"+ token.assignedCounterId+"token.isPremium"+this.props.isPremium)
       if(token.tokenName === undefined || token.tokenName === null){
         token.assignedCounterId = this.props.match.params.id;
         token.type = this.props.type;
         token.counterOwnerrId =0;
       }
       token.counterOwnerrId = this.state.counterOwnerId;
      this.setState({token:token,isLoading:false});
  

    });
  }

  completeWork(event) {

    this.setState({isLoading:true})
      postRequest('/completework',this.state.token,
      (token)=>{
        this.refreshCounter();
      });

     
    }
    setCounterOwnerId(id){
      console.log("Setting owner id  :::"+id);
      this.setState({counterOwnerId:id});
    }



  render(){
     
    if(!this.state.isCounterOwnerLoggedIn){
      return <div>
          <label>Counter owner Id</label>
          <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" id="counterOwnerId" name="counterOwnerId" placeholder="Counter owner Id..."
          onChange={e => this.setCounterOwnerId(e.target.value)}/>
           <input type="submit" value="Log In"/>
           </form>
      </div>
    }
    else{
    return (
      <div >
        <LoadingScreen isLoading={this.state.isLoading}></LoadingScreen>
          <h1>{this.props.name+this.props.match.params.id}</h1>
          <button onClick={this.completeWork.bind(this)}>Complete work</button>
          <div></div>
          <button onClick={this.refreshCounter.bind(this)}>Refresh</button>
      <div></div>
      {this.getTokenInfo()}

      </div>
    );
  }
   
  }
  getTokenInfo(){
    if(this.state.token.tokenName === undefined || this.state.token.tokenName === null){
      return <div><h2>Currently no token assigned to counter</h2></div>
    }else{
      return <div><h2>Token assigned is {this.state.token.tokenName}</h2>
      <TokenDisplay token={this.state.token}></TokenDisplay></div>
    }
  }
}
export default ServiceCounter;
