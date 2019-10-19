import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import {postRequest,getRequest} from '../Utils/RestUtils';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

class TokenCounter extends Component{
  state={
    userName:'',
    isPremium:false,
    tokenNumber:0,
    successMessage:'',
    token:{},
    tokenType:'',
    applicationId:0
   

  }
  constructor(props){
    super(props);
    
  }
  validateForm() {
    return this.state.userName.length > 0 && this.state.pass.length > 0;
  }

  setCustomerName(name){
    this.setState({ownerName:name});
  }

  setApplicationId(id){
    this.setState({applicationId:id});
  }


  handleSubmit(event) {
      
    event.preventDefault();

    getRequest('/generatetoken',
      (data) =>{
        let token = data;
        token.type = this.state.tokenType;
        token.ownerId = this.state.applicationId;
        token.ownerName = this.state.ownerName;
        token.tokenName = this.state.tokenType[0]+'-'+token.tokenNumber;
       postRequest('/assignnewtokentocounter',token,
          (updatedToken)=>
        { 
           this.setState({token:updatedToken})
       });
      }
      );



    }
  render(){
    return (
      <div >
          <h1>{this.props.name+" "+this.props.match.params.id}</h1>
          <form onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup controlId="email" >
            <FormLabel>Application Id</FormLabel>
            <FormControl
              autoFocus
              type="text"
              onChange={e => this.setApplicationId(e.target.value)}
            />
        

          <FormLabel>Customer Name</FormLabel>
            <FormControl
              autoFocus
              type="text"
              onChange={e => this.setCustomerName(e.target.value)}
            />
          </FormGroup>

          <div onChange={this.setTokenType.bind(this)}>
            <input type="radio" value="Normal" name="gender"/> Normal
            <input type="radio" value="Premium" name="gender"/> Premium
          </div>
     
          <Button block
          //disabled={!this.validateForm()} 
          type="submit">
            Create and assign token
          </Button>

        {this.renderTokenData()}


        </form>
      <div>{this.state.successMessage}</div>
        
      </div>
    );
  }

  renderTokenData(){
    if(this.state.token.tokenName === undefined || this.state.token.tokenName === null){
      return <div>No token assigned to this counter</div>
    }else{
      return <div>{"Token "+this.state.token.tokenName+" for "+this.state.token.ownerName+" is assigned to counter "+this.state.token.assignedCounterId}</div>
    }
  }
  setTokenType(event){
    let isPremium = event.target.value === "Premium";
    this.setState({isPremium : isPremium,tokenType:event.target.value});
    console.log("is premium value ::: "+isPremium);
  }
  
}
export default TokenCounter;
