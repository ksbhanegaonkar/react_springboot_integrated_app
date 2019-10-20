import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import {postRequest,getRequest} from '../Utils/RestUtils';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import TokenDisplay from "../TokenDisplay/TokenDisplay";
import './TokenCounter.css';
import LoadingScreen from "../LoadingScreen/LoadingScreen";

class TokenCounter extends Component{
  state={
    userName:'',
    tokenNumber:0,
    successMessage:'',
    token:{},
    tokenType:'Normal',
    applicationId:0,
    isLoading:false
   

  }
  constructor(props){
    super(props);
    
  }

  setCustomerName(name){
    this.setState({ownerName:name});
  }

  setApplicationId(id){
    this.setState({applicationId:id});
  }

  setTokenType(type){
    this.setState({tokenType:type});
  }
  handleSubmit(event) {
      this.setState({isLoading:true});
    event.preventDefault();

    getRequest('/generatetoken',
      (data) =>{
        let token = data;
        token.type = this.state.tokenType;
        token.ownerId = this.state.applicationId;
        token.ownerName = this.state.ownerName;
        token.tokenName = this.state.tokenType[0]+'-'+token.tokenNumber;
        token.assignedCounterId = 0;
       postRequest('/assignnewtokentocounter',token,
          (updatedToken)=>
        { 
           this.setState({token:updatedToken,isLoading:false})
       });
      }
      );



    }
  render(){
    return (
      <div >
          <LoadingScreen isLoading={this.state.isLoading}></LoadingScreen>
          <h1>{this.props.name+this.props.match.params.id}</h1>
          <form onSubmit={this.handleSubmit.bind(this)}>
         
          <label>Application Id</label>
          <input type="text" id="applicationId" name="applicationId" placeholder="Customer application Id..."
            onChange={e => this.setApplicationId(e.target.value)}/>
        
            <label>CustomerName</label>

            <input type="text" id="customerName" name="customerName" placeholder="Customer name..."
            onChange={e => this.setCustomerName(e.target.value)}/>

            <label>Token Type</label>
            <select id="tokenType" name="tokenType"  onChange={e => this.setTokenType(e.target.value)}>
              <option value="Normal">Normal</option>
              <option value="Premium">Premium</option>
            
            </select>


     


          <input type="submit" value=" Create and assign token"/>
        
        {this.renderTokenData()}
        </form>
        
        

      </div>
    );
  }

  renderTokenData(){
    if(this.state.token.tokenName === undefined || this.state.token.tokenName === null){
      return <div></div>
    }else{
      return <div>
        <h2>{"Token "+this.state.token.tokenName+" for "+this.state.token.ownerName+" is assigned to counter "+this.state.token.type[0]+"C-"+this.state.token.assignedCounterId}</h2>
        <TokenDisplay token={this.state.token}></TokenDisplay>
        </div>
    }
  }

  
}
export default TokenCounter;
