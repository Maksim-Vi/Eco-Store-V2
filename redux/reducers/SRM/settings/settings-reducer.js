import { SET_SRM_SETTINGS } from "./action";

let initialState = {
    settings: {}
};

const settingsReducer = (state = initialState, action) =>{
    switch (action.type) { 
        case SET_SRM_SETTINGS:{
            return {...state, settings: action.settings}
        }
        default:
            return state;
    }
} 


export default settingsReducer;