export function products(defaultStore = [], action){
    switch(action.type){
        case "FETCH_PRODUCTS":
            return action.data;
        default: return defaultStore;   
    }
}