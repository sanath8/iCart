import React, { Component } from "react";
// import axios from "axios";
import './css/main.css'
import Header from './components/header';
import Chatbot from './components/chatbot';
import Graph from './components/graph';
import CartList from './components/cartList';
import Recommender from './components/recommender';

class App extends Component {
  // initialize our state 
  state = {
    list: [],
  //   data: [],
  //   intervalIsSet: false,
  };

  // componentDidMount() {
  //   this.getDataFromDb();
  //   if (!this.state.intervalIsSet) {
  //     let interval = setInterval(this.getDataFromDb, 1000);
  //     this.setState({ intervalIsSet: interval });
  //   }
  // }

  // componentWillUnmount() {
  //   if (this.state.intervalIsSet) {
  //     clearInterval(this.state.intervalIsSet);
  //     this.setState({ intervalIsSet: null });
  //   }
  // }

  // getDataFromDb = () => {
  //   fetch("http://localhost:3001/api/getData")
  //     .then(data => data.json())
  //     .then(res => this.setState({ data: res.data }));
  // };
  getCart = (list) => {
    this.setState({
      list: list
    })
  }
  render() {
    // const { data } = this.state;
    return (
      <div>
        <Header/>
      <div className="body">
        <Chatbot getCart={this.getCart}/>
        <Graph/>
        <CartList list={this.state.list}/>
      </div>
        <Recommender/>
      </div>
    );
  }
}

export default App;