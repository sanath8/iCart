import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Welcome from '../Welcome';
import Register from '../Register'
import Mainscreen from '../MainScreen';

export default class Root extends React.Component{
    componentDidMount(){
        // console.log('routes mounting')
        this.props.FetchProducts.bind(null)();
        this.props.FetchRecommends.bind(null)(this.props.login.age,this.props.login.gender);
    }
    shouldComponentUpdate(newProps){
        // console.log('should routes update',newProps)
        if(newProps.login.age && !newProps.login.recommended) {
            this.props.FetchRecommends.bind(null)(this.props.login.age,this.props.login.gender);
        }
        return true;
    }
    render(){
        // console.log('routes rendering')
        // console.log(this.props)
        return (
            <BrowserRouter>
              <Route exact path='/' render={({history})=>{
                    if(!this.props.login.started){
                        return <Welcome {...this.props}/>
                    }
                    else if(!this.props.login.recognized){
                        return <Redirect to={{pathname: '/register'}}/>
                    }
                    else{
                        return <Redirect to={{pathname: '/icart'}}/>
                    }
                }}/>
              <Route exact path='/register' render={()=>{
                    if(this.props.login.started && !this.props.login.recognized){
                        return <Register {...this.props}/>
                    }
                    else if(this.props.login.started && this.props.login.recognized){
                        return <Redirect to={{pathname: '/icart'}}/>
                    }
                    else{
                        // return <Register {...this.props}/>
                        return <Redirect to={{pathname: '/'}}/>
                    }
                }}/>
              <Route exact path='/icart' render={({history})=>{
                    if(this.props.login.started && this.props.login.recognized){
                        return <Mainscreen history={history} {...this.props}/>
                    }else{
                        return <Mainscreen {...this.props}/>
                        // return <Redirect to={{pathname: '/'}}/>
                    }
                }}/>
            </BrowserRouter>
        );
    }
}