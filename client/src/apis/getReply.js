import axios from "axios";
export const getReply = (query) => {
    console.log(query)
    return axios.post("http://localhost:5005/conversations/default/respond",{query: query})
    // return axios.post("http://192.168.1.13:5005/conversations/default/respond",{query: query})
    .then(res => 
        {
            console.log(res.data)
            var reply = [];
            for(var i=0; i<res.data.length;i++){
                reply.push(res.data[i].text)
            }
            console.log(reply)
            return reply
        })
    .catch(err => {
        console.log(err)
        return ['hello']
    });
};
