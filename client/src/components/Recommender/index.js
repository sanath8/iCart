import React from 'react';
import './main.css';

class Recommender extends React.Component {
    constructor(props){
        super(props);
        this.state = {
           count: 0
        }
     }
     
    componentDidMount() {
        this.interval = setInterval(() => this.setState({
            time: Date.now(),
            count: this.props.recommends.length ? this.state.count+1 : 0
        }), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }    

    getItems = () => {
        if(this.props.recommends.length && this.props.products.length){
            let recommendList = this.props.recommends;
            let allItems = this.props.products;
            let {count} = this.state;
            let length = recommendList.length;
            let itemsToShow = [];
            if(recommendList.length<=4)
                itemsToShow = recommendList;
            else itemsToShow =  recommendList.slice(count%(length-3),count%(length-3)+4)
            Array(count).fill(count).forEach(_=>{
                itemsToShow.unshift(itemsToShow.pop())
            })
            return itemsToShow.map(item=>{
                return allItems.filter(allitem=>allitem._id===item)[0];
            })
            // return allItems.filter(item=>itemsToShow.includes(item._id))
        }
        return [];
    }

    addToCart = (item) => {
        if(!this.props.cart.includes(item) && (item))
            this.props.AddToCart.bind(null)(item)
    }
    
    render() {
        const items = this.getItems.bind(this)();
      return (
         <div className="recommender">
                {items.length <= 0
                    ?"NO DB ENTRIES YET"
                    :items.map(item => (
                     <div className="item" key={item._id} onClick={this.addToCart.bind(this,item.name)}>
                        <img style={{objectFit: "contain"}}src={require('../../images/'+item._id+'.png')} alt="hs"></img>
                        <div className="details">
                            <label className="label">{item.name}</label><br></br>
                            {/* <span>{item.name}</span><br></br> */}
                            {/* <label>Cat: {item.category}</label><br></br> */}
                            <label className="label">Price: {item.SP}</label><br></br>
                            <label className="label">Discount: {item.discount}</label>
                        </div>
                     </div>
                    ))
                }
         </div>
      );
   }
}
export default Recommender;
