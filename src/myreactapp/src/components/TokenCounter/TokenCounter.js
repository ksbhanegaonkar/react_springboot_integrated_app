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


    postRequest('/test',{"kedar":"kedar"},
      (data) =>{
                console.log("data is ::::"+data.kedar);
                this.setState({userName:data.kedar});
              }
      
      );

  }
  render(){
    return (
      <div className="Login">
          <h1>{this.state.userName}</h1>

      </div>
    );
  }

  
}
export default TokenCounter;
