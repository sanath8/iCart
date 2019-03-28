import React, { Component } from "react";
import {getRekognition} from '../apis/rerunRekognition';
import {Fab, TextField} from '@material-ui/core'
import '../css/welcome.css';
class GetNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    getRekognition(this.state.value).then(res=>{
      console.log(res)
      if(res.recognized){
        this.props.getStatus(res);
      }
    })
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
              onChange={this.handleChange}
              required
            />  
          </div>
          <div style={{width:"30vw"}}>
            <Fab
              className="button"
              variant="extended"
              size="medium"
              color="primary"
              onClick={this.handleSubmit}>Submit
            </Fab>
          </div>
      </form>
      </div>
      </div>
    );
  }
}

export default GetNumber;