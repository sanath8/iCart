export const getItemlist = (name) => {
    return fetch("https://icartsystem.herokuapp.com/products?productName="+name)
    .then(data => data.json())
    .then(res => {
        let list=[]
        for(var i=0; i<res.length; i++){
            list.push(res[i].name)
        }
        // console.log(list)
        return list
    })
    .catch(err => console.log(err));
};
