import axios from "axios";
export const getPath = (source,destination) => {
    return axios.post("http://127.0.0.1:9000/shortestPath?current="+source+"&destination="+destination)
    .then(res => {
        // console.log(res.data.shortest_path)
        return {data: res.data.shortest_path}
    })
    .catch(err => {
        console.log(err)
        return {data:[5,0,1]}
    });
};
