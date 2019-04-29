import React, { Component } from "react";
import './main.css'
import Header from '../Header';
import Chatbot from '../Chatbot';
import Graph from '../Graph';
import CartList from '../Cartlist';
import Recommender from '../Recommender';

class App extends Component {
   render() {
    // console.log('rendering mainscreen')
    return (
      <div>
        <Header refs={this.refs} {...this.props}/>
        <div className="body">
          <div className="sidebar" ref="chatbot">
            <Chatbot />
          </div>
          <div className="sidebar" ref="cartlist">
            <CartList {...this.props} />          
          </div>
          <div className="layout" ref="graph">
            <Graph {...this.props} />
          </div>
        </div>
        <Recommender {...this.props} />
      </div>
    );
  }
}

export default App;