import React, { Component } from "react";
import {getRequest} from '../Utils/RestUtils';
import './CustomerConsole.css';

class CustomerConsole extends Component{
  state={
    userName:'',
    assignedTokens:[{}]

  }
  constructor(props) {
    super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = { //state is by default an object
      assignedTokens: [
          { tokenName: undefined, assignedCounterId: undefined,type: undefined, ownerName: undefined },
       ]
    }


  }

  componentDidMount(){
     setInterval(this.refreshConsole.bind(this),1000);
  }

  refreshConsole(){
    getRequest('/getallassignedtokens',
   (data)=>{

    this.setState({assignedTokens:data})
     
    
   });
 }

  render(){
    return (
      <div >
            <h1 id='title'>{this.props.name}</h1>
            <table id='token'>
               <tbody>
                  <tr>{this.renderTableHeader()}</tr>
                  {this.renderTableData()}
               </tbody>
            </table>
       
      </div>
    );
  }

  renderTableHeader() {
    let header = ["Token","Counter","Name"];//Object.keys(this.state.students[0])
    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
 }


 renderTableData() {
  return this.state.assignedTokens.map((token, index) => {
     if(token.tokenName != undefined){
      const { tokenName, assignedCounterId, type, ownerName } = token;
      let assignedCounterName = type==="Premium"?"PC-"+assignedCounterId:"NC-"+assignedCounterId;
      return (
         <tr key={tokenName}>
            <td>{tokenName}</td>
            <td>{assignedCounterName}</td>
            <td>{ownerName}</td>
         </tr>
      );

     }

});
}
}
export default CustomerConsole;
