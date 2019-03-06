import React from 'react';
import Datalist from'./datalist';
import './../css/main.css';
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import {getReply} from '../apis/getReply';

class Chatbot extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         layoutName: "default",
         input: "",
         replyContent:[]
       };
   }
  
    onChange = input => {
      this.setState({
        input: input
      });
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
  
    onChangeInput = event => {
      let input = event.target.value;
      // console.log(input)
      this.setState(
        {
          input: input
        },
        () => {
          this.keyboard.setInput(input);
        }
      );      
    };

   sendMessage = () => {
      document.getElementById('keyBoard').style.display = "none"
      var postContent = document.getElementById('myPost');
      var postContainer = document.getElementById('postContainer');
      var myPost = `<div class="messageBody">
                        ${postContent.value}
                     </div>`;
      postContainer.innerHTML=postContainer.innerHTML+myPost;
      getReply(postContent.value).then(res =>{
         if(res)
            this.setState({
               replyContent: res
            })
         // postContent.value='';
         for(var i=0; i<this.state.replyContent.length;i++){
            var replyPost = `<div class="replyBody">
               ${this.state.replyContent[i]}
            </div>`;
            postContainer.innerHTML=postContainer.innerHTML+replyPost;
         }
         // var replyPost = `<div class="replyBody">
         //    ${this.state.replyContent}
         // </div>`;
         // postContainer.innerHTML=postContainer.innerHTML+replyPost;
         postContent.value='';
         // this.state = this.initialState;
         this.keyboard.setInput("");
      })
      // console.log(this.state.input)
   }
   showKeyboard(){
      document.getElementById('keyBoard').style.display = "initial"
   }
   hideKeyboard(){
      document.getElementById('keyBoard').style.display = "none"
   }
   render() {
      return (
         <div className="chatbot">
            <Datalist getCart = {this.props.getCart} getData = {this.props.getData}/>
            <div className="chatbotHeader">Need any Help?</div>
            <div className="messageArea" id="postContainer"></div>
            <div>
               <textarea 
                  className="messageInput"
                  id='myPost'
                  value={this.state.input}
                  placeholder={"Tap on the virtual keyboard to start"}
                  onChange={e => this.onChangeInput(e)}
                  onFocus={this.showKeyboard}
                  // onBlur={this.hideKeyboard} 
               >
               </textarea>
               <button className="msgSubmit" onClick={this.sendMessage}>></button>
            </div>
            <div id="keyBoard" className='keyboard' style={{display: "none"}}>
               <Keyboard
                  style={{margin: 0}}
                  ref={r => (this.keyboard = r)}
                  layoutName={this.state.layoutName}
                  onChange={input => this.onChange(input)}
                  onKeyPress={button => this.onKeyPress(button)}
               />
            </div>
         </div>
      );
   }
}
export default Chatbot;
