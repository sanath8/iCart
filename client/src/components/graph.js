import React from 'react';
import './../css/main.css';
  
const nodes = [{x:50,y:25},{x:125,y:25},{x:200,y:25},{x:200,y:75},{x:125,y:75},{x:50,y:75}]
const path = [5, 0, 1, 4, 3]

class Graph extends React.Component {
    state = {
        intervalIsSet: false,
    };
    componentDidMount() {
        this.updateCanvas();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.updateCanvas, 10000);
            this.setState({ intervalIsSet: interval });
        }
    }
    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({ intervalIsSet: null });
        }
    }
    updateCanvas = () => {
        const ctx = this.refs.canvas.getContext('2d');
        for( var i=0; i<6; i++){
            ctx.fillRect(nodes[i].x, nodes[i].y, 5, 5);
        }
        for( var i=0; i<3; i++){
            ctx.font = "Arial";
            ctx.fillText(i+1, nodes[i].x, nodes[i].y-2);
        }
        for( var i=3; i<6; i++){
            ctx.font = "Arial";
            ctx.fillText(i+1, nodes[i].x, nodes[i].y+14);
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
        ctx.strokeStyle = "red"
        for(i=0; i < path.length-1; i++){
            ctx.moveTo(nodes[path[i]].x+2.5, nodes[path[i].y+2.5])
            ctx.lineTo(nodes[path[i+1]].x+2.5, nodes[path[i+1]].y+2.5)
            console.log(i+''+(i+1))
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
