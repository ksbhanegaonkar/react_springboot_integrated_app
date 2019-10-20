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
         let header = ["Token","Application Id","Name","Counter Name","Created timestamp"];//Object.keys(this.state.students[0])
         return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
         })
      }
     
     
      renderTableData() {
         let assignedCounterName = this.props.token.type==="Premium"?"PC-"+this.props.token.assignedCounterId:"NC-"+this.props.token.assignedCounterId;
         let date = new Date(this.props.token.createdTimestamp);
         let createdTimeStamp = date.toString("MMM dd"); // "Dec 20"
         return (
              <tr key={this.props.token.tokenName}>
                 <td>{this.props.token.tokenName}</td>
                 <td>{this.props.token.ownerId}</td>
                 <td>{this.props.token.ownerName}</td>
                 <td>{assignedCounterName}</td>
                 <td>{createdTimeStamp}</td>
              </tr>
          
               );
          }
     
  

}
export default TokenDisplay;
