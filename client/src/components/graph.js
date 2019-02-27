import React from 'react';
import './../css/main.css';
import axios from "axios";
// function getUniqueIds(){
//     var limit = 5, lower_bound = 0, upper_bound = 5, unique_random_numbers = [];
//     while (unique_random_numbers.length < limit) {
//         var random_number = Math.floor(Math.random()*(upper_bound - lower_bound) + lower_bound);
//         if (unique_random_numbers.indexOf(random_number) === -1) { 
//             unique_random_numbers.push( random_number );
//         }
//     }
//     return unique_random_numbers
// }

const nodes = [{x:50,y:25},{x:125,y:25},{x:200,y:25},{x:200,y:75},{x:125,y:75},{x:50,y:75}]
const path = [5, 0, 1, 4, 3]
// const path = setInterval(getUniqueIds()

class Graph extends React.Component {
    state = {
        intervalIsSet: false,
    };
    componentDidMount() {
        this.getPathFromDb();
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
    getPathFromDb = () => {
        axios.post("http://localhost:3001/api/getPath",{source:0,data:[1,3]})
        .then(res => console.log(res.data))
        // .then(data => data.json())
        // .then(res => this.setState({ data: res.data }))
        .catch(err => console.log(err));
    };
    updateCanvas = () => {
        const ctx = this.refs.canvas.getContext('2d');
        for( var i=0; i<6; i++){
            ctx.fillRect(nodes[i].x, nodes[i].y, 5, 5);
        }
        for(i=0; i<3; i++){
            ctx.font = "Arial";
            ctx.fillText(i+1, nodes[i].x, nodes[i].y-2);
        }
        for(i=3; i<6; i++){
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
