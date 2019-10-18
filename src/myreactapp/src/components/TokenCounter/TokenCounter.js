import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import {postRequest,getRequest} from '../Utils/RestUtils';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

class TokenCounter extends Component{
  state={
    userName:'',
    isPremium:false,
    tokenNumber:0,
    successMessage:''
   

  }
  constructor(props){
    super(props);
    
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

  handleSubmit(event) {
      
    event.preventDefault();

    getRequest('/gettoken',
      (data) =>{
       this.setState({tokenNumber:data});
       postRequest('/assigntoken',{"tokenNumber":data,
       "isPremium":this.state.isPremium,"ownerName":this.state.userName},
       (counterId)=>
       { 
         let tokenType = this.state.isPremium?"premium":"";
       let successMessage = "Token number "+this.state.tokenNumber
       +" is issued for "
       +this.state.userName + " and assigned to "+
       tokenType
       +" counter "+counterId;
           this.setState({successMessage:successMessage})
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
            <FormLabel>Username</FormLabel>
            <FormControl
              autoFocus
              type="text"
             // value={this.state.userName == null?this.state.userName:''}
              onChange={e => this.setUsername(e.target.value)}
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
          <div className='error-message'>
          <span>{this.state.errorMsg}</span>
          </div>


        </form>
      <div>{this.state.successMessage}</div>
        
      </div>
    );
  }
  setTokenType(event){
    let isPremium = event.target.value === "Premium";
    this.setState({isPremium : isPremium});
    console.log("is premium value ::: "+isPremium);
  }
  
}
export default TokenCounter;
