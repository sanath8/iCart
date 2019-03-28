import axios from "axios";
export const getRekognition = (number) => {
    // return axios.post("http://192.168.129.1:9005/rerun?phone_number="+number)
    // return axios.post("http://192.168.1.13:9005/rerun?phone_number="+number)
    // return axios.post("http://localhost:9005/rerun?phone_number="+number)
    return axios.post("localhost")
    .then(res => {
            return res.data
            // return {"recognized": "9008174384", "age": 34.5, "gender": "Male"}
            
        })
    .catch(err => {
        console.log(err, number)
        return {"recognized": "9008174384", "age": 34.5, "gender": "Male"}
        // return {"recognized": false}
    });
};
