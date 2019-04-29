import React, { Component } from 'react';
import {Fab} from '@material-ui/core'
import './main.css';

class Welcome extends Component{
  render() {
    return(
      <div className="landing">
        <div className="bg">
          <div style={{width: "40vw"}}>
            <p className="text">Welcome to the iCart Mall!</p>
            <Fab
              className="button"
              variant="extended"
              size="medium"
              color="primary"
              onClick={this.props.RunRecognition}>Let's Get Started</Fab>
          </div>
        </div>
      </div>            
      )
  }
}

export default Welcome;