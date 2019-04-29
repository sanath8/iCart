import React, { Component } from "react";
import {Fab, TextField} from '@material-ui/core'
import '../Welcome/main.css';
class GetNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }  
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  render() {
    return (
      <div className="bg">
        <div className="landing">
        <form className="form">
          <p>
            Hello user, we found that this is your first visit to our mall.
          </p>
          <p>
            Please provide your mobile number to continue.
          </p>
          <div className="input">
            <TextField
              label="Mobile Number"
              variant="outlined"
              type="tel" 
              pattern="[0-9]{10}"
              placeholder="Ten digit mobile number"
              value={this.state.value} 
              onChange={this.handleChange.bind(this)}
              required
            />  
          </div>
          <div style={{width:"30vw"}}>
            <Fab
              className="button"
              variant="extended"
              size="medium"
              color="primary"
              onClick={this.props.SubmitNumber.bind(null,this.state.value)}>Submit
            </Fab>
          </div>
      </form>
      </div>
      </div>
    );
  }
}

export default GetNumber;