export function recommends(defaultStore=[], action){
    switch(action.type){
        case 'FETCH_RECOMMENDS':
            return [...new Set(action.data)];
        default: return defaultStore;   
    }
}