import React from 'react';
import './../css/main.css';
class Recommender extends React.Component {
    
    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }    

    getUniqueIds = () => {
        var limit = 4, lower_bound = 1, upper_bound = 10, unique_random_numbers = [];
        while (unique_random_numbers.length < limit) {
            var random_number = Math.floor(Math.random()*(upper_bound - lower_bound) + lower_bound);
            if (unique_random_numbers.indexOf(random_number) === -1) { 
                unique_random_numbers.push( random_number );
            }
        }
        return unique_random_numbers
    }
    render() {
        const { data } = this.props;
        const y = this.getUniqueIds()
        // console.log(y)
        // const { data } = this.state;
      return (
         <div className="recommender">
                {data.length <= 0
                    ?"NO DB ENTRIES YET"
                    :data.filter((e)=>{
                        return y.includes(e.id)
                     }).map(dat => (
                     <div className="item">
                        <img src={require('../images/'+dat.productName+'.jpg')} alt="hs"></img>
                        <div className="details">
                            <label>Name: {dat.productName}</label><br></br>
                            <label>Cat: {dat.category}</label><br></br>
                            <label>Price: {dat.price}</label><br></br>
                            <label>Discount: {dat.discount}</label>
                        </div>
                     </div>
                    ))
                }
         </div>
      );
   }
}
export default Recommender;
