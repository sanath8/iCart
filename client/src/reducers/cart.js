export function cart(defaultStore=[], action){
    switch(action.type){
        case 'ADD_TO_CART':
            return [...defaultStore,action.product]
        case 'DELETE_FROM_CART':
            return defaultStore.filter(item=>{return item !== action.product})
        default: return defaultStore;   
    }
}