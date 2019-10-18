import React, { Component } from "react";
import {getRequest} from '../Utils/RestUtils';
import './CustomerConsole.css';

class CustomerConsole extends Component{
  state={
    userName:'',

  }
  constructor(props) {
    super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = { //state is by default an object
       students: [
          { tokenNumber: undefined, assignedCounter: '', isPremium: undefined, ownerName: '' },
       ]
    }


  }

  refreshConsole(){
    getRequest('/getallassignedtokens',
   (data)=>{

    this.setState({students:data})
     
    
   });
 }

  render(){
    return (
      <div >
            <h1 id='title'>{this.props.name}</h1>
            <table id='students'>
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
    let header = Object.keys(this.state.students[0])
    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
 }


 renderTableData() {
  return this.state.students.map((student, index) => {
     const { tokenNumber, assignedCounter, isPremium, ownerName } = student //destructuring
     return (
        <tr key={tokenNumber}>
           <td>{tokenNumber}</td>
           <td>{assignedCounter}</td>
           <td>{isPremium}</td>
           <td>{ownerName}</td>
        </tr>
     )
  })

  
}
}
export default CustomerConsole;
