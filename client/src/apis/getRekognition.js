import axios from "axios";
export const getRekognition = () => {
    console.log('call')
    return axios.post("http://192.168.1.4:9005/run")
    // return axios.post("http://localhost:9005/run")
    // return axios.post("localhost")
    .then(res => {
            return res.data
        })
    .catch(err => {
        console.log(err)
        return {"recognized": false}
    });
};
