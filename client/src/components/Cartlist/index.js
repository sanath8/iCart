import React from 'react';
import Datalist from'../Datalist';
import SwipeableListItem from "../SwipeableListItem";
import SwipeableList from "../SwipeableList";
import './main.css';

// const background = <span>Delete</span>;

class CartList extends React.Component {
    getPath = (item) => {
        let searchItem = this.props.products.filter(function(dataItem){
            return dataItem.name === item
        })
        let cat, section
        if(searchItem.length) 
            cat = searchItem[0].category
        switch(cat){
            case "Food and Beverages": section=2; break;
            case "Stationary and Books": section=5; break;
            case "Sports and Fitness": section=4; break;
            case "Beauty and Personal Care": section=0; break;
            case "Clothing and Fashion": section=3; break;
            case "Home Care": section=1; break;
            default : section=-1; 
        }
        this.props.SetSection(section)
    }
    render() {
        const cart = this.props.cart
        return (
         <div className="cartList">
            <div className="cartListHeader">Items in the cart</div>
            
            <div className="listArea">
                <Datalist {...this.props}/>
                <SwipeableList>
                    {
                        cart.map((item) => (
                            <SwipeableListItem key={item} {...this.props}>
                            <label 
                                key={item}
                                onClick={e=>this.getPath(item)}
                            >
                                {item}
                            </label>
                            </SwipeableListItem>
                        ))
                    }
                </SwipeableList>
            </div>
         </div>
      );
   }
}

export default CartList;
