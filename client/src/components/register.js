import React, { Component } from "react";
import {getRekognition} from '../apis/rerunRekognition';
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
        this.props.getStatus(true);
      }
    })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <label>
          Enter Your 10 digit mobile number to continue
          <input type="number" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}

export default GetNumber;