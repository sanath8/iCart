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
      data: [],
      item: ""
    };
  }

  getData = (data) => {
    this.setState({
      data: data
    })
  }

  getPath = (data) => {
    this.setState({
      item: data
    })
  }

   render() {
    return (
      <div>
        <Header/>
      <div className="body">
        <Chatbot />
        <Graph item={this.state.item}/>
        <CartList getData={this.getData} getPath={this.getPath}/>
      </div>
        <Recommender data={this.state.data} age={this.props.age} gender={this.props.gender}/>
      </div>
    );
  }
}

export default App;