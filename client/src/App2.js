import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  // initialize our state 
  state = {
    data: [],
    intervalIsSet: false,
  };

  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getDataFromDb = () => {
    fetch("http://localhost:3001/api/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <ul>
          {data.length <= 0
            ? "NO DB ENTRIES YET"
            : data.map(dat => (
              <li style={{ padding: "10px" }} key={data.message}>
                <span style={{ color: "gray" }}> id: </span> {dat.id} <br />
                <span style={{ color: "gray" }}> Product Name: </span> {dat.productName} <br />
                <span style={{ color: "gray" }}> Category: </span> {dat.category} <br />
                <span style={{ color: "gray" }}> Price: </span> {dat.price} <br />
            </li>
              ))}
        </ul>
      </div>
    );
  }
}

export default App;