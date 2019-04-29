import React from 'react';
import {IoIosChatbubbles, IoIosCart, IoIosPower} from 'react-icons/io'
import './main.css'

class Header extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         toggleCart: false,
         toggleChat: false
      }
   }
   openChat = () => {
      if(this.state.toggleChat){
         this.setState({
            toggleChat: false
         })
         this.props.refs.chatbot.style.width = '0';
         this.props.refs.graph.style.width = '100vw';
      }
      else if(!this.state.toggleCart){
         this.setState({
            toggleChat: true
         })
         this.props.refs.graph.style.width = '70vw';
         this.props.refs.chatbot.style.width = '30vw';
      }
      else{
         this.setState({
            toggleChat: true,
            toggleCart: false
         })
         this.props.refs.cartlist.style.width = '0';
         this.props.refs.chatbot.style.width = '30vw';
      }
    }
    openCart = () => {
      if(this.state.toggleCart){
         this.setState({
            toggleCart: false
         })
         this.props.refs.cartlist.style.width = '0';
         this.props.refs.graph.style.width = '100vw';
      }
      else if(!this.state.toggleChat){
         this.setState({
            toggleCart: true
         })
         this.props.refs.graph.style.width = '70vw';
         this.props.refs.cartlist.style.width = '30vw';
      }
      else{
         this.setState({
            toggleChat: false,
            toggleCart: true
         })
         this.props.refs.chatbot.style.width = '0';
         this.props.refs.cartlist.style.width = '30vw';
      }
    }
   render() {
      let chat = <IoIosChatbubbles className="icon" size="3vh" onClick={this.openChat.bind(this)}/>
      let cart = <IoIosCart className="icon" size="3vh" onClick={this.openCart.bind(this)}/>
      let logout = <IoIosPower className="logoff" size="3vh" onClick={this.props.Logoff.bind(null)}/>
      return (
         <div>
            {chat}
            {cart}
            {logout}
            <div className="header">
               <label>iCart</label>
            </div>
            {/* {icon2} */}
         </div>
      );
   }
}
export default Header;