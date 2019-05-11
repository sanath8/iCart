import axios from 'axios';
import data from '../data';
import ips from '../ipaddress'; 

export function FetchProducts(){
    return ({type:'FETCH_PRODUCTS',data:data.data})
}
export function FetchRecommends(age,gender){
    return (dispatch) => {
        axios.get(ips.recommendationUrl+":9000/recommendations?age="+age+"&gender="+gender+"&month=january&number=10").then(res=>{
            console.log(res.data.recommendations)
            dispatch({type:'FETCH_RECOMMENDS', data:res.data.recommendations})
        }).catch(err=>{
            console.log(err)
            dispatch({type:'FETCH_RECOMMENDS', data:[1,5,1,1,10,5,12,23,78,81,10,67]})
        })
    }
}
export function RunRecognition(){
    return (dispatch) => {
        axios.get(ips.raspberryPiUrl+":9005/run").then(res=>{
            dispatch({type:'RUN_RECOGNITION', data:res.data})
        }).catch(err=>{
            console.log(err)
            dispatch({type:'RUN_RECOGNITION', data:{"started":true,"recognized":false}})
        })
    }
}
export function SubmitNumber(number){
    return (dispatch) => {
        axios.get(ips.raspberryPiUrl+":9005/rerun?phone_number="+number).then(res=>{
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