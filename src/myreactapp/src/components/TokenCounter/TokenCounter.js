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
                console.log("the data is ::::"+data.kedar);
                this.setState({userName:data.kedar});
              }
      
      );

  }
  render(){
    return (
      <div >
          <h1>{this.props.name}</h1>
            id is {this.props.match.params.id}
      </div>
    );
  }

  
}
export default TokenCounter;
