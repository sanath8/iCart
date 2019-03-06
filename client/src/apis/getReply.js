import axios from "axios";
export const getReply = (query) => {
    console.log(query)
    // return axios.post("http://localhost:3001/api/getReply",{query: query})
    // return axios.post("10.20.50.60:5005/conversations/default/respond",{query: query})
    // return axios.post("http://10.20.50.60:5005/conversations/default/respond",{query: query})
    return axios.post("http://localhost:5005/conversations/default/respond",{query: query})
    .then(res => 
        {
           console.log(res.data)
        //    var reply="";
        //    for(var i=0; i<res.data.length;i++){
        //     reply += res.data[i].text
        //    }
            var reply = [];
            for(var i=0; i<res.data.length;i++){
                reply.push(res.data[i].text)
            }
           console.log(reply)
           return reply
        //    return res.data[0].text 
            // return 'hello'
        })
    .catch(err => console.log(err));
};
