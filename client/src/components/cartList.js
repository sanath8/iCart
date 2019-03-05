import React from 'react';
import './../css/main.css';
 
class CartList extends React.Component {
    render() {
        const cart = this.props.list
        return (
         <div className="cartList">
            <div className="list">
                Items in the cart
                {
                    cart.map((item) => (
                        <li>
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
