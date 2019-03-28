import React from 'react';
import './../css/main.css';
import { getPath } from '../apis/getPath';
// import {getPath} from '../apis/getPath';

const nodes = [{x:50,y:25},{x:125,y:25},{x:200,y:25},{x:200,y:75},{x:125,y:75},{x:50,y:75}]
const sections = ["Food","Stationary","Sports","Personal Care","Clothing","Home Care"]

class Graph extends React.Component {
    state = {
        // intervalIsSet: false,
        location: 0,
        path: []
    };
    componentDidMount() {
        // getPath().then(res =>{
        //     this.setState({
        //         path: res.data
        //     })
        //     console.log(res.data)
        // })
        var that = this;
        (function(){
            // var ws = new WebSocket("ws://192.168.1.7:5678/")
            var ws = new WebSocket("ws://localhost:5678/")
            ws.onmessage = function (event) {
                that.setState({
                    location: event.data
                })
                // console.log(that.props.item)
                // getPath(that.state.location,that.props.item).then(res =>{
                //     that.setState({
                //         path: res.data
                //     })
                // })
                that.updateCanvas()
            };
        })()
        this.updateCanvas();
        // setTimeout(this.updateCanvas,1000)
        // if (!this.state.intervalIsSet) {
        //     let interval = setInterval(this.updateCanvas, 10000);
        //     this.setState({ intervalIsSet: interval });
        // }
    }
    // componentWillUnmount() {
    //     if (this.state.intervalIsSet) {
    //         clearInterval(this.state.intervalIsSet);
    //         this.setState({ intervalIsSet: null });
    //     }
    // }

    updateCanvas = () => {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0,0,500,500)
        for( var i=0; i<6; i++){
            ctx.fillRect(nodes[i].x, nodes[i].y, 5, 5);   //nodes
        }
        if(this.state.location>=0){
            ctx.fillStyle = "#0000FF";
            ctx.fillRect(nodes[this.state.location].x, nodes[this.state.location].y, 5, 5);   //current node
        }
        ctx.fillStyle = "#000000";
        for(i=0; i<3; i++){
            ctx.font = "10px Arial";
            ctx.fillText(sections[i], nodes[i].x-20, nodes[i].y-2);     //section names
        }
        for(i=3; i<6; i++){
            ctx.font = "9px Arial";
            ctx.fillText(sections[i], nodes[i].x-20, nodes[i].y+14);     //section names
        }
        ctx.beginPath();
        ctx.moveTo(nodes[0].x+2.5, nodes[0].y+2.5)
        for( i=0; i<6; i++){
            ctx.lineTo(nodes[(i+1)%6].x+2.5, nodes[(i+1)%6].y+2.5)
        }
        ctx.moveTo(nodes[1].x+2.5, nodes[1].y+2.5)
        ctx.lineTo(nodes[4].x+2.5, nodes[4].y+2.5)
        ctx.strokeStyle = "black"
        ctx.stroke()

        ctx.beginPath();
        ctx.strokeStyle = "red";
        const {path} = this.state;
        for(i=0; i < path.length-1; i++){
            ctx.moveTo(nodes[path[i]].x+2.5, nodes[path[i].y+2.5])
            ctx.lineTo(nodes[path[i+1]].x+2.5, nodes[path[i+1]].y+2.5)
            // console.log(i+''+(i+1))
        }
        ctx.stroke()
    }
    render() {
      return (
         <div className="graph">
            <canvas id="theCanvas" ref="canvas"></canvas>
         </div>
      );
   }
}
export default Graph;
