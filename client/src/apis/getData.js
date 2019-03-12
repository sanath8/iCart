export const getDataFromDb = () => {
    // return fetch("https://icartsystem.herokuapp.com/products?productName=")
    return fetch("http://localhost:3001/products?productName=")
    .then(data => data.json())
    .then(res => {
        let items={data:[]}
        for(var i=0; i<res.length; i++){
            items.data.push(res[i])
        }
        // return items
        return res        
    })
    .catch(err => {
        console.log(err)
        return [{"_id":1,"name":"Saffola Active Edible Oil","category":"Food and Beverages","SP":105,"discount":"19%","MRP":130,"subCategory":"oils"},{"_id":2,"name":"Fortune Sunflower Refined Oil","category":"Food and Beverages","SP":560,"discount":"12%","MRP":635,"subCategory":"oils"}]
    });
};
