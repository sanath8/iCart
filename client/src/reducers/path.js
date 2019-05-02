export function path(defaultStore={section: -1}, action){
    switch(action.type){
        case 'SET_SECTION': 
            return {section:action.section}
        default: return defaultStore;   
    }
}