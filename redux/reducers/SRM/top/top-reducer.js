import { SET_SRM_TOP } from "./action"

let initialState = {
    top: []
}

const topReducer = (state = initialState, action) =>{
    switch (action.type) {
        case SET_SRM_TOP:{
            return {...state,top: action.top}
        }
        default:
            return state;
    }
}

export default topReducer;