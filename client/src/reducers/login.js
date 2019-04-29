let loginDefault = {
    started: false,
    recognized: false,
    recommended: false,
    age: 0,
    gender: 'Male'
}

export function login(defaultStore=loginDefault, action){
    switch(action.type){
        case 'RUN_RECOGNITION': 
            if(action.data.recognized){
                return {
                    started: true,
                    recognized: true,
                    recommended: false,
                    age: Math.floor(action.data.age),
                    gender: action.data.gender.toLowerCase(),
    
                }                
            }
            return {...defaultStore,...action.data}
        case 'FETCH_RECOMMENDS':
            return {...defaultStore, 'recommended':true};
        case 'LOG_OFF': 
            return loginDefault;
        default: return defaultStore;   
    }
}