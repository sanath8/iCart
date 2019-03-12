import axios from "axios";
export const getRecommendation = (query) => {
    console.log(query)
    return axios.post("http://127.0.0.1:9000/recommendations?age=23&gender=male&month=january&number=10")
    .then(res => 
        {
            // return res.data.recommendations
            return [1,5,1,1,10,5,12,23,78,81,10,67]
        })
    .catch(err => console.log(err));
};
