export const getDataFromDb = () => {
    return fetch("http://localhost:3001/api/getData")
    // return fetch("https://icartsystem.herokuapp.com/products?productName=")
    .then(data => data.json())
    .then(res => {
        let items={data:[]}
        for(var i=0; i<res.length; i++){
            items.data.push(res[i])
        }
        // return items
        return res        
    })
    .catch(err => console.log(err));
};
