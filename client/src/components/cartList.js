import React from 'react';
import './../css/main.css';
import Datalist from'./datalist';

class CartList extends React.Component {
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
    getPath = (item) => {
        let data = this.state;
        let array = data.data;
        let searchItem = array.filter(function(dataItem){
            return dataItem.name == item
        })
        let cat, section
        if(searchItem.length) cat = searchItem[0].category
        switch(cat){
            case "Food and Beverages": section=0; break;
            case "Stationary and Books": section=1; break;
            case "Sports and Fitness": section=2; break;
            case "Beauty and Personal Care": section=3; break;
            case "Clothing and Fashion": section=4; break;
            case "Home Care": section=5; break;
        }
        this.props.getPath(section)
    }

    getData = (data) => {
        this.setState({
            data: data
        })
        this.props.getData(data)
    }
    render() {
        const cart = this.state.list
        return (
         <div className="cartList">
            <Datalist getCart = {this.getCart} getData = {this.getData}/>
            <div className="list">
                Items in the cart
                {
                    cart.map((item) => (
                        <li 
                            key={item}
                            onClick={e=>this.getPath(item)}
                        >
                            {item}
                        </li>
                    ))
                }
            </div>
         </div>
      );
   }
}

export default CartList;
