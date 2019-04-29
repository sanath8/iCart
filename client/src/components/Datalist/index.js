import React from 'react';
import KeyBoard from "../Keyboard"
import "react-simple-keyboard/build/css/index.css";
import './main.css';

class Datalist extends React.Component {
   constructor(props){
      super(props);
      this.keyboard = React.createRef();
      this.state = {
         productNames: [],
         input: ""
      }
   }

   add = () => {
      document.getElementById('keys').style.display = "none"
      var item = document.getElementById("itemName").value
      this.setState({
         input: "",
         productNames: []
      },() => {
         this.keyboard.current.setInput("");
      })
      if(!this.props.cart.includes(item) && (item))
         this.props.AddToCart.bind(null)(item)
      this.keyboard.current.setInput("");
   }
   
   showKeyboard(){
      document.getElementById('keys').style.display = "initial"
   }

   filterItems = (string) => {
      let {products} = this.props
      let matchingProducts = []
      for(var i=0; i< products.length; i++){
         var product_name = (products[i].name).toLowerCase();
         var searchString = (string).toLowerCase();
         if(product_name.indexOf(searchString) !== -1){
             matchingProducts.push(products[i].name);
         }
      }
      return matchingProducts
   }
   getInput = (input) => {
      if(input.length)
         this.setState({
            input: input,
            productNames: this.filterItems(input)
         })
   }

   onChangeInput = event => {
      let input = event.target.value;
      if(input.length)
         this.setState({
            input: input,
            productNames: this.filterItems(input)
         },() => {
            this.keyboard.current.setInput(input);
         })
    }

   render() {
      const { productNames } = this.state
      return (
         <div className="datalist">
            <input 
               className="datalistInput"
               id = "itemName"
               type="text"
               list="data"
               placeholder="Search an item"
               value={this.state.input}
               onChange={e => this.onChangeInput(e)}
               onFocus={this.showKeyboard}
            />
            <datalist id="data">
               {productNames.length <=0
                  ? 'No data'
                  : productNames.map((item) =>
                  <option key={item} value={item} />
               )}
            </datalist>
            <button className="itemAdd" onClick={this.add}>Add</button>
            <div id="keys" className='keyboard' style={{display: "none"}}>
               <KeyBoard 
                  ref={this.keyboard}
                  getInput={this.getInput}
                  inputName={"input2"}
                  baseClass = {"keyboard2"}
               />
            </div>
         </div>
      );
   }
}

export default Datalist;