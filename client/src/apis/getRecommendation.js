import axios from "axios";
export const getRecommendation = (age, gender) => {
    console.log(age, gender)
    // return axios.post("http://127.0.0.1:9000/recommendations?age="+age+"&gender="+gender+"&month=january&number=10")
    return axios.post("http://192.168.1.13:9000/recommendations?age="+age+"&gender="+gender+"&month=january&number=10")
    .then(res => 
        {
            return res.data.recommendations
            // return [1,5,1,1,10,5,12,23,78,81,10,67]
        })
    .catch(err => {
        console.log(err)
        return [1,5,1,1,10,5,12,23,78,81,10,67]
    });
};
