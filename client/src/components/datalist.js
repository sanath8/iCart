import React from 'react';
import './../css/main.css';
import KeyBoard from "./keyboard"
import "react-simple-keyboard/build/css/index.css";
import {getDataFromDb} from '../apis/getData';
import {getItemlist} from '../apis/getItemlist';

class Datalist extends React.Component {
   constructor(props){
      super(props);
      this.keyboard = React.createRef();
      this.state = {
         // data: ['oreo','shampoo','lays','shoe'],
         data: [],
         productNames: [],
         cart: [],
         input: ""
      }
   }

   componentDidMount() {
      getDataFromDb().then(res =>{
         if(res.data)
         this.setState({
            data: res.data
         })
         this.props.getData(this.state.data)
      })
      // setTimeout(() => {
      //    this.props.getData(this.state.data)
      // },5000)
   }

   getProductNames = () => {
      this.state.data.forEach(element => {
         if(!this.state.productNames.includes(element.productName))
         this.state.productNames.push(element.productName)
      })
   }

   add = () => {
      document.getElementById('keys').style.display = "none"
      var e = document.getElementById("itemName")
      if(!this.state.cart.includes(e.value) && (e.value))
         this.state.cart.push(e.value)
      this.props.getCart(this.state.cart)
      this.props.getData(this.state.data)
      console.log(this.state.cart.length)
      // e.value = ""
      this.setState({
         input: ""
      },() => {
         this.keyboard.current.setInput("");
      })
      // this.keyboard.current.setInput("");
   }
   
   showKeyboard(){
      document.getElementById('keys').style.display = "initial"
   }

   getInput = (input) => {
      if(input.length)
      getItemlist(input).then(res => {
         this.setState({
            productNames: res
         })
      })
      this.setState({
         input: input,
      })
   }

   onChangeInput = event => {
      let input = event.target.value;
      this.setState({
          input: input
        },() => {
          this.keyboard.current.setInput(input);
      })
    }

   render() {
      // this.getProductNames()
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