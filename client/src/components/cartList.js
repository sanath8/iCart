import React from 'react';
import './../css/main.css';
import Datalist from'./datalist';

class CartList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            list: [],
        };
    }
    
    getCart = (list) => {
        this.setState({
          list: list
        })
    }
    getPath = (item) => {
        console.log(item)
        this.props.getPath(item)
    }
    render() {
        const cart = this.state.list
        return (
         <div className="cartList">
            <Datalist getCart = {this.getCart} getData = {this.props.getData}/>
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
