import React from 'react';
import './../css/main.css';
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

class KeyBoard extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         layoutName: "default",
         input: "",
       };
   }
  
    onChange = input => {
      this.setState({
        input: input
      });
    //   this.keyboard.setInput(input)
      this.props.getInput(this.state.input)
      // console.log("Input changed", input);
    };
  
    onKeyPress = button => {
      // console.log("Button pressed", button);
      if (button === "{shift}" || button === "{lock}") this.handleShift();
    };
  
    handleShift = () => {
      let layoutName = this.state.layoutName;
      this.setState({
        layoutName: layoutName === "default" ? "shift" : "default"
      });
    };
  
    // onChangeInput = event => {
    //   let input = event.target.value;
    //   // console.log(input)
    //   this.setState(
    //     {
    //       input: input
    //     },
    //     () => {
    //       this.keyboard.setInput(input);
    //     }
    //   );      
    // };

    setInput = (input) => {
        this.setState({
            input: input
        })
        // console.log('reset')
        this.keyboard.setInput("");
    }

   render() {
      return (
        <Keyboard
            baseClass = {this.props.baseClass}
            style={{margin: 0}}
            ref={r => (this.keyboard = r)}
            inputName={this.props.inputName}
            layoutName={this.state.layoutName}
            onChange={input => this.onChange(input)}
            onKeyPress={button => this.onKeyPress(button)}
        />
      );
   }
}

export default KeyBoard;
