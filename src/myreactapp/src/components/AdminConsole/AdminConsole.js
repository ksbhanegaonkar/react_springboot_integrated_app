import React, { Component } from "react";
import {getRequest} from '../Utils/RestUtils';
import './AdminConsole.css';

class AdminConsole extends Component{
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
     this.refreshConsole();
  }

  refreshConsole(){
    getRequest('/audittoken',
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
          <button onClick={this.refreshConsole.bind(this)}>Refresh</button>
      </div>
    );
  }

  renderTableHeader() {
    let header = ["Token Id","Token Name","Type","Assigned Counter"
    ,"Counter Owner Id","Application Id","Customer Name",
  "Created Time","Completed Time"];//Object.keys(this.state.students[0])
    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
 }


 renderTableData() {
  return this.state.assignedTokens.map((token, index) => {
     if(token.tokenName != undefined){
      const { tokenName,tokenNumber,ownerId,completedTimestamp,createdTimestamp, counterOwnerrId,assignedCounterId, type, ownerName } = token;
      let assignedCounterName = type==="Premium"?"PC-"+assignedCounterId:"NC-"+assignedCounterId;
      return (
         <tr key={tokenName}>
           <td>{tokenNumber}</td>
            <td>{tokenName}</td>
            <td>{type}</td>
            <td>{assignedCounterName}</td>
            <td>{counterOwnerrId}</td>
            <td>{ownerId}</td>
            <td>{ownerName}</td>
            <td>{createdTimestamp}</td>
            <td>{completedTimestamp}</td>
         </tr>
      );

     }

});
}
}
export default AdminConsole;
