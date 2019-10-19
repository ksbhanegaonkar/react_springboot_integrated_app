import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import {postRequest,getRequest,postRequestEveryInterval} from '../Utils/RestUtils';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import './TokenDisplay.css';
class TokenDisplay extends Component{



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
         let assignedCounterName = this.props.token.type==="Premium"?"PC-"+this.props.token.assignedCounterId:"NC-"+this.props.token.assignedCounterId;
       return (
              <tr key={this.props.token.tokenName}>
                 <td>{this.props.token.tokenName}</td>
                 <td>{assignedCounterName}</td>
                 <td>{this.props.token.ownerName}</td>
              </tr>
          
               );
          }
     
  

}
export default TokenDisplay;
