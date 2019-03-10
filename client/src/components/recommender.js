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
        var limit = 4, lower_bound = 1, upper_bound = 84, unique_random_numbers = [];
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
        // const { data } = this.state;
      return (
         <div className="recommender">
                {data.length <= 0
                    ?"NO DB ENTRIES YET"
                    :data.filter((e)=>{
                        return y.includes(e._id)
                     }).map(item => (
                     <div className="item" key={item._id}>
                        <img src={require('../images/'+item._id+'.png')} alt="hs"></img>
                        <div className="details">
                            <label>{item.name}</label><br></br>
                            {/* <span>{item.name}</span><br></br> */}
                            {/* <label>Cat: {item.category}</label><br></br> */}
                            <label>Price: {item.SP}</label><br></br>
                            <label>Discount: {item.discount}</label>
                        </div>
                     </div>
                    ))
                }
         </div>
      );
   }
}
export default Recommender;
