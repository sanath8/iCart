import axios from 'axios';
export function FetchProducts(){
    return (dispatch) => {
        axios.get("http://localhost:3001/products?productName=").then(res=>{
            dispatch({type:'FETCH_PRODUCTS', data:res.data})
        }).catch(err=>{
            console.log(err)
        })
    }
}
export function FetchRecommends(age,gender){
    return (dispatch) => {
        axios.get("http://127.0.0.1:9000/recommendations?age="+age+"&gender="+gender+"&month=january&number=10").then(res=>{
            dispatch({type:'FETCH_RECOMMENDS', data:res.data.recommendations})
        }).catch(err=>{
            console.log(err)
            dispatch({type:'FETCH_RECOMMENDS', data:[1,5,1,1,10,5,12,23,78,81,10,67]})
        })
    }
}
export function RunRecognition(){
    return (dispatch) => {
        axios.get("http://192.168.43.210:9005/run").then(res=>{
            dispatch({type:'RUN_RECOGNITION', data:res.data})
        }).catch(err=>{
            console.log(err)
            dispatch({type:'RUN_RECOGNITION', data:{"started":true,"recognized":false}})
        })
    }
}
export function SubmitNumber(number){
    return (dispatch) => {
        axios.get("http://192.168.1.4:9005/rerun?phone_number="+number).then(res=>{
            dispatch({type:'RUN_RECOGNITION', data:res.data})
        }).catch(err=>{
            console.log(err)
            dispatch({type:'RUN_RECOGNITION', data:{"recognized": "9008174384", "age": 34.5, "gender": "Male"}})
        })
    }
}

export function Logoff(){
    return {type:"LOG_OFF"}
}
export function AddToCart(product){
    return {type:"ADD_TO_CART",product}
}
export function DeleteFromCart(product){
    return {type:"DELETE_FROM_CART",product}
}
export function SetSection(section){
    return {type:"SET_SECTION",section}
}