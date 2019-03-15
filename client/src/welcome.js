import React, { Component } from 'react';
import MainScreen from './mainScreen';
import GetNumber from './components/register';
import {getRekognition} from './apis/getRekognition';

class Welcome extends Component{
  constructor (props) {
    super(props)
    this.state = {
        recognized: false,
        started: false
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
    getRekognition().then(e=>{
        this.setState({
            started: true
        })
        console.log(e)
        if(e.recognized){
            this.setState({
                recognized: true
            })
        }
    })
  }
  getStatus = (data) => {
    this.setState({
      recognized: data
    })
  }
  render() {
    const { recognized } = this.state
    const { started } = this.state
    if(started && recognized) {
        return <MainScreen/>
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