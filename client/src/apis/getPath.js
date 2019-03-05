import axios from "axios";
export const getPath = () => {
    return axios.post("http://localhost:3001/api/getPath",{source:0,data:[1,3]})
    .then(res => {return res})
    .catch(err => console.log(err));
};
