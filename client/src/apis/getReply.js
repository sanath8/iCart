import axios from "axios";
export const getReply = (query) => {
    // console.log(query)
    return axios.post("http://localhost:3001/api/getReply",{query: query})
    .then(res => {return res})
    .catch(err => console.log(err));
};
