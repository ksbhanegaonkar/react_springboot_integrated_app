import React, { Component } from "react";
import './LoadingScreen.css';
class LoadingScreen extends Component{



      render(){
          if(this.props.isLoading === true){
            return (
                <div class="loader"></div>
             );
          }
          else{
              return "";
          }
       }

  
          
     
  

}
export default LoadingScreen;
