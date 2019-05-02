import React from 'react';
import './main.css';
import { getPath } from '../../apis/getPath';

// const nodes = [{x:50,y:25},{x:125,y:25},{x:200,y:25},{x:200,y:75},{x:125,y:75},{x:50,y:75}]
const nodes = [{x:380,y:350},{x:650,y:350},{x:910,y:350},{x:910,y:850},{x:650,y:850},{x:380,y:850}]
// const sections = ["Food","Stationary","Sports","Personal Care","Clothing","Home Care"]

class Graph extends React.Component {
    state = {
        location: 0,
        path: []
    };
    componentDidMount() {
        var that = this;
        (function(){
            var ws = new WebSocket("ws://192.168.43.210:5678/")
            // var ws = new WebSocket("ws://localhost:5678/")
            ws.onmessage = function (event) {
                that.setState({
                    location: event.data
                })
                console.log(event.data);
                that.getPath()
                that.updateCanvas()
            };
        })()
        this.getPath();
        this.updateCanvas();
     }
    componentDidUpdate(prevProps) {
        if(!(this.props.path.section === prevProps.path.section))
           this.getPath();
    }
    getPath = () => {
        if(this.props.path.section >=0){
            getPath(this.state.location,this.props.path.section).then(res =>{
                this.setState({
                    path: res.data
                })
                this.updateCanvas()
            })
        }
    }
    updateCanvas = () => {
        var i;
        var canvas = document.getElementById('theCanvas');
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0,0,1200,1200)
        var img = new Image();
        img.src = require('../../images/layout.png');
        img.onload =  () => {
            canvas.width=1200;
            canvas.height=1200;
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
        // }
        // const image = document.getElementById('source');
        // ctx.drawImage(image, 50, 71, 104, 124, 52, 27, 150, 50);
        // for( i=0; i<6; i++){
        //     ctx.fillRect(nodes[i].x, nodes[i].y, 15, 15);   //nodes
        // }
        if(this.state.location>=0){
            // ctx.fillStyle = "#0000FF";
            // ctx.fillRect(nodes[this.state.location].x-7.5, nodes[this.state.location].y-7.5, 15, 15);   //current node
            var cart = new Image();
            cart.src = require('../../images/cart.png');
            cart.onload =  () => {
                // canvas.width=1200;
                // canvas.height=1200;
                ctx.drawImage(cart, 0, 0, cart.width*50, cart.height*25, nodes[this.state.location].x-15, nodes[this.state.location].y-15, canvas.width, canvas.height);
            }
        }
        // ctx.fillStyle = "#000000";
        // for(i=0; i<3; i++){
        //     ctx.font = "10px Arial";
        //     ctx.fillText(sections[i], nodes[i].x-20, nodes[i].y-2);     //section names
        // }
        // for(i=3; i<6; i++){
        //     ctx.font = "9px Arial";
        //     ctx.fillText(sections[i], nodes[i].x-20, nodes[i].y+14);     //section names
        // }
        //-------------------------------------------------------
        // ctx.beginPath();
        // ctx.moveTo(nodes[0].x+2.5, nodes[0].y+2.5)
        // for( i=0; i<6; i++){
        //     ctx.lineTo(nodes[(i+1)%6].x+2.5, nodes[(i+1)%6].y+2.5)
        // }
        // ctx.moveTo(nodes[1].x+2.5, nodes[1].y+2.5)
        // ctx.lineTo(nodes[4].x+2.5, nodes[4].y+2.5)
        // ctx.strokeStyle = "black"
        // ctx.stroke()
        //-------------------------------------------------------
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5;
        const {path} = this.state;
        // ctx.moveTo(nodes[path[1]].x+2.5, nodes[path[1].y+2.5])
        for(i=0; i < path.length; i++){
            // ctx.moveTo(nodes[path[i]].x+2.5, nodes[path[i].y+2.5])
            // ctx.lineTo(nodes[path[i]].x+2.5, nodes[path[i]].y+2.5)
            ctx.lineTo(nodes[path[i]].x, nodes[path[i]].y)
        }
        ctx.stroke()
        }
    }
    render() {
        return (
         <div className="graph">
            <canvas id="theCanvas" ref="canvas"></canvas>
            <div style={{display:"none"}}>
                {/* <img id="source" src="http://16hljuumewe30onxk2um4f3bmt.wpengine.netdna-cdn.com/files/2015/05/Orange.png"/> */}
                {/* <img id="source" src={require('../images/layout.jpg')} alt='sorry'/> */}
            </div>
         </div>
      );
   }
}
export default Graph;
