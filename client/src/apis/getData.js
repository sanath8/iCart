export const getDataFromDb = () => {
    return fetch("http://localhost:3001/api/getData")
    .then(data => data.json())
    .then(res => {return res})
    .catch(err => console.log(err));
};
