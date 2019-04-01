import React from 'react';
import './../css/main.css';
import Datalist from'./datalist';
import SwipeableListItem from "./SwipeableListItem";
import SwipeableList from "./SwipeableList";

const background = <span>Delete</span>;

// const fakeContent = (
//   <div className="FakeContent">
//     <span>Swipe to delete</span>
//   </div>
// );

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
        console.log('here')
        let data = this.state;
        let array = data.data;
        let searchItem = array.filter(function(dataItem){
            return dataItem.name === item
        })
        let cat, section
        if(searchItem.length) cat = searchItem[0].category
        switch(cat){
            case "Food and Beverages": section=2; break;
            case "Stationary and Books": section=5; break;
            case "Sports and Fitness": section=4; break;
            case "Beauty and Personal Care": section=0; break;
            case "Clothing and Fashion": section=3; break;
            case "Home Care": section=1; break;
            default : section=-1; 
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
            {/* <div className="list"> */}
            <div className="cartListHeader">Items in the cart</div>
            <SwipeableList background={background}>
                {
                    cart.map((item) => (
                        <SwipeableListItem key={item}>
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
            {/* </div> */}
            {/* <div >
                <SwipeableList background={background}>
                <SwipeableListItem>{fakeContent}</SwipeableListItem>
                <SwipeableListItem>{fakeContent}</SwipeableListItem>
                <SwipeableListItem>{fakeContent}</SwipeableListItem>
                <SwipeableListItem>{fakeContent}</SwipeableListItem>
                <SwipeableListItem>{fakeContent}</SwipeableListItem>
                </SwipeableList>
            </div> */}
         </div>
      );
   }
}

export default CartList;
