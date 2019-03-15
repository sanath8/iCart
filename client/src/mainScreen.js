import React, { Component } from "react";
import './css/main.css'
import Header from './components/header';
import Chatbot from './components/chatbot';
import Graph from './components/graph';
import CartList from './components/cartList';
import Recommender from './components/recommender';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      list: [],
      data: [],
    };
  }

  getCart = (list) => {
    this.setState({
      list: list
    })
  }

  getData = (data) => {
    this.setState({
      data: data
    })
  }

  render() {
    return (
      <div>
        <Header/>
      <div className="body">
        <Chatbot getCart={this.getCart} getData={this.getData}/>
        <Graph/>
        <CartList list={this.state.list}/>
      </div>
        <Recommender data={this.state.data} age={this.props.age} gender={this.props.gender}/>
      </div>
    );
  }
}

export default App;