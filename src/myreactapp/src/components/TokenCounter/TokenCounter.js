import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import {postRequest} from '../Utils/RestUtils';


class TokenCounter extends Component{
  state={
    userName:'',

  }
  constructor(props){
    super(props);
    
  }


  componentDidMount() {


    postRequest('/test',{username:this.state.userName,password:this.state.pass},
      (data) =>{
                console.log("data is ::::"+data);
              }
      
      );

  }
  render(){
    return (
      <div className="Login">
          <h1>{this.state.username}</h1>

      </div>
    );
  }

  
}
export default TokenCounter;
