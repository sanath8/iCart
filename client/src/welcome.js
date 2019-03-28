import React, { Component } from 'react';
import MainScreen from './mainScreen';
import GetNumber from './components/register';
import {getRekognition} from './apis/getRekognition';
import {Fab} from '@material-ui/core'
import './css/welcome.css';

class Welcome extends Component{
  constructor (props) {
    super(props)
    this.state = {
        recognized: false,
        started: false,
        age: 0,
        gender: ''
    }
  }
  getRecognition = () => {
    getRekognition().then(res=>{
        this.setState({
            started: true
        })
        console.log(res)
        if(res.recognized){
            this.setState({
                recognized: true,
                age: Math.floor(res.age),
                gender: res.gender.toLowerCase()
            })
        }
    })
  }
  getStatus = (data) => {
    console.log(data)
    this.setState({
      recognized: true,
      age: data.age,
      gender: data.gender
    })
  }
  render() {
    const { recognized } = this.state
    const { started } = this.state
    if(started && recognized) {
        return <MainScreen age={this.state.age} gender={this.state.gender}/>
    } 
    if(started && !recognized) {
        return <GetNumber getStatus={this.getStatus}/>
    }
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
              onClick={this.getRecognition}>Let's Get Started</Fab>
          </div>
        </div>
      </div>            
      )
  }
}

export default Welcome;