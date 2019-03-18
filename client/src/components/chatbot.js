import React from 'react';
import './../css/main.css';
import Datalist from'./datalist';
import KeyBoard from "./keyboard"
import "react-simple-keyboard/build/css/index.css";
import {getReply} from '../apis/getReply';

class Chatbot extends React.Component {
   constructor(props){
      super(props);
      this.keyboard = React.createRef();
      this.state = {
         input: "",
         replyContent:[]
       };
   }

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
               replyContent: res,
            })
         postContent.value='';
         for(var i=0; i<this.state.replyContent.length;i++){
            var replyPost = `<div class="replyBody">
               ${this.state.replyContent[i]}
            </div>`;
            postContainer.innerHTML=postContainer.innerHTML+replyPost;
         }
         this.keyboard.current.setInput("");
      })
   }

   showKeyboard(){
      document.getElementById('keyBoard').style.display = "initial"
   }

   hideKeyboard(){
      document.getElementById('keyBoard').style.display = "none"
   }

   getInput = (input) => {
      this.setState({
         input: input
      })
   }

   render() {
      return (
         <div className="chatbot">
            {/* <Datalist getCart = {this.props.getCart} getData = {this.props.getData}/> */}
            <div className="chatbotHeader">Need any Help?</div>
            <div className="messageArea" id="postContainer"></div>
            <div>
               <textarea 
                  className="messageInput"
                  id='myPost'
                  value={this.state.input}
                  placeholder={"Tap on the virtual keyboard to start"}
                  onChange={e => {}}
                  // onChange={e => this.onChangeInput(e)}
                  onFocus={this.showKeyboard}
                  // onBlur={this.hideKeyboard} 
               >
               </textarea>
               <button className="msgSubmit" onClick={this.sendMessage}>></button>
            </div>
            <div id="keyBoard" className='keyboard' style={{display: "none"}}>
               <KeyBoard
                  ref={this.keyboard}
                  getInput={this.getInput}
                  inputName={"input"}
                  // baseClass = {"keyboard"}
               />
            </div>
         </div>
      );
   }
}

export default Chatbot;