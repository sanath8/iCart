import React from 'react';
import './../css/main.css';
// import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import {getDataFromDb} from '../apis/getData';

class Datalist extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         // data: ['oreo','shampoo','lays','shoe'],
         data: [],
         productNames: [],
         cart: [],
         layoutName2: "default",
         input2: ""
      }
   }
   componentDidMount() {
      getDataFromDb().then(res =>{
         this.setState({
            data: res.data
         })
      })
      setTimeout(() => {
         this.props.getData(this.state.data)
      },1000)
   }

   getProductNames = () => {
      this.state.data.forEach(element => {
         if(!this.state.productNames.includes(element.productName))
         this.state.productNames.push(element.productName)
      })
   }
   
   // onChange2 = input2 => {
   //    this.setState({
   //      input2: input2
   //    });
   //    console.log("Input changed", input2);
   //  };
  
   //  onKeyPress2 = button2 => {
   //    console.log("Button pressed", button2);
   //    if (button2 === "{shift}" || button2 === "{lock}") this.handleShift2();
   //  };
  
   //  handleShift2 = () => {
   //    let layoutName2 = this.state.layoutName2;
   //    this.setState({
   //      layoutName2: layoutName2 === "default" ? "shift" : "default"
   //    });
   //  };
  
   //  onChangeInput2 = event2 => {
   //    let input2 = event2.target.value;
   //    this.setState(
   //      {
   //        input2: input2
   //      },
   //      () => {
   //        this.keyboard2.setInput2(input2);
   //      }
   //    );
   //    console.log("came here")
   //  };
   
   add = () => {
      // document.getElementById('keys').style.display = "none"
      var e = document.getElementById("itemName")
      if(!this.state.cart.includes(e.value) && (e.value))
         this.state.cart.push(e.value)
      this.props.getCart(this.state.cart)
      this.props.getData(this.state.data)
      console.log(this.state.cart.length)
      e.value = ""
   }
   
   // showKeyboard2(){
   //    document.getElementById('keys').style.display = "initial"
   // }
   
   render() {
      this.getProductNames()
      const { productNames } = this.state
      return (
         <div className="datalist">
            <input 
               className="datalistInput"
               id = "itemName"
               type="text"
               list="data"
               placeholder="Search an item"
               // value={this.state.input2}
               // onChange={e => this.onChangeInput2(e)}
               // onFocus={this.showKeyboard2}
            />
            <datalist id="data">
               {productNames.length <=0
                  ? 'No data'
                  : productNames.map((item) =>
                  <option value={item} />
               )}
            </datalist>
            <button className="itemAdd" onClick={this.add}>Add</button>
            {/* <div id="keys" class='keyboard' style={{display: "none"}}>
               <Keyboard
                  style={{margin: 0}}
                  ref={r2 => (this.keyboard2 = r2)}
                  layoutName={this.state.layoutName2}
                  onChange={input2 => this.onChange2(input2)}
                  onKeyPress={button2 => this.onKeyPress2(button2)}
               />
            </div> */}
         </div>
      );
   }
}
export default Datalist;