import React from 'react';
import './../css/main.css';
class Recommender extends React.Component {
    state = {
        data: [],
        intervalIsSet: false,
    };
    
    componentDidMount() {
        this.getDataFromDb();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getDataFromDb, 10000);
            this.setState({ intervalIsSet: interval });
        }
        console.log(this.state.data);
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
         <div className="recommender">
                    {data.length <= 0
                        ? "NO DB ENTRIES YET"
                        : data.map(dat => (
                            <div className="item">
                                <img src={require('../images/'+dat.productName+'.jpg')} alt="hs"></img>
                                <div className="details">
                                    <label>Name: {dat.productName}</label><br></br>
                                    <label>Cat: {dat.category}</label><br></br>
                                    <label>Price: {dat.price}</label><br></br>
                                    <label>Discount: {dat.discount}</label>
                                </div>
                            </div>
                    ))}
            {/* <div className="item">
                <img src={require('../images/'+'oreo.jpg')} alt="hs"></img>
                    {data.length <= 0
                        ? "NO DB ENTRIES YET"
                        : data.map(dat => (
                            <div className="details">
                                <label>Name: {dat.productName}</label><br></br>
                                <label>Category: {dat.category}</label><br></br>
                                <label>Price: {dat.price}</label><br></br>
                                <label>Discount: {dat.discount}</label>
                            </div>
                    ))}
            </div>
            <div className="item">
                <img src={require('../images/'+'lays.jpg')} alt="hs"></img>
                <div className='details'>
                    {JSON.stringify(data[0])}
                </div>
            </div>
            <div className="item">
                <img src={require('../images/'+'hs.jpg')} alt="hs"></img>
                <div className='details'>
                    {JSON.stringify(data[2])}
                </div>
            </div>
            <div className="item">
                <img src={require('../images/'+'lays.jpg')} alt="hs"></img>
                <div className='details'>
                    {JSON.stringify(data[3])}
                </div>
            </div> */}
         </div>
      );
   }
}
export default Recommender;
