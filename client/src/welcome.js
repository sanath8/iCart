import React, { Component } from 'react';
import MainScreen from './mainScreen';
import GetNumber from './components/register';
import {getRekognition} from './apis/getRekognition';

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
//   ShowModalFunction(visible) {
//     this.setState({cancelable: visible}); 
//   }
//   componentDidMount(){
//   }
//   componentWillUnmount() {
//   } 
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
        <div>
            <button onClick={this.getRecognition}>GO</button>
        </div>      
      )
  }
}

// const mapStateToProps = (state) => ({
//   verified: state.languageReducer.verified,
//   isVisible: state.languageReducer.isVisible
// });

// const mapDispatchToProps = (dispatch) => ({
//   showSplashScreen: () => dispatch({type: Actions.SHOW_SCREEN})
// });

// export default connect(mapStateToProps, mapDispatchToProps)(StartPage);

export default Welcome
// export default withRouter(Welcome)