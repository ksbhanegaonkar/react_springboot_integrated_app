import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import {postRequest,getRequest,postRequestEveryInterval} from '../Utils/RestUtils';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

class ServiceCounter extends Component{
  state={
    userName:'',
    isPremium:false,
    tokenNumber:0,
    successMessage:'',
    token:{}

  }
  constructor(props){
    super(props);
    
  }

  componentDidMount(){
    // console.log("id is:::::"+this.props.match.params.id+" ispremium "+this.props.isPremium);
    // postRequestEveryInterval('/getassignedtoken',{"counterId":this.props.match.params.id,"isPremium":this.props.isPremium},
    // (token)=>{
    //   if(token.tokenNumber == -1){
    //     let message = "no token available for counter";
    //     this.setState({successMessage:message})
    //   }
    //   else{
    //     let message = "Token "+token.tokenNumber+" of Mr. "+token.ownerName+" is assigned to this counter";
    //     this.setState({successMessage:message})
    //     console.log(token.tokenNumber);
    //   }
      
    // },5000);
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

  refreshCounter(){
     postRequest('/getassignedtoken',{"counterId":this.props.match.params.id,"isPremium":this.props.isPremium},
    (token)=>{
      if(token.tokenNumber == -1){
        let message = "no token available for counter";
        this.setState({successMessage:message})
      }
      else{
        let message = "Token "+token.tokenNumber+" of Mr. "+token.ownerName+" is assigned to this counter";
        this.setState({successMessage:message})
        console.log(token.tokenNumber);
      }
      
    });
  }

  handleSubmit(event) {
      
    event.preventDefault();

      postRequest('/discardassignedtoken',{"counterId":this.props.match.params.id,"isPremium":this.props.isPremium},
      (token)=>{
        console.log(token.tokenNumber);
        this.setState({token:{},successMessage:""});
      });


    }
  render(){
    return (
      <div >
         
          <h1>{this.props.name+" "+this.props.match.params.id}</h1>
          <div>{this.props.successMessage}</div>
          <form onSubmit={this.handleSubmit.bind(this)}>

          <Button block 
          type="submit">
            Complete work
          </Button>
          <div className='error-message'>
          <span>{this.state.errorMsg}</span>
          </div>


        </form>
      <button onClick={this.refreshCounter.bind(this)}>Refresh</button>
      <div></div>
      <span>{this.state.successMessage}</span>
      

     
        
      </div>
    );
  }
  setTokenType(event){
    let isPremium = event.target.value === "Premium";
    this.setState({isPremium : isPremium});
    console.log("is premium value ::: "+isPremium);
  }
  
}
export default ServiceCounter;
