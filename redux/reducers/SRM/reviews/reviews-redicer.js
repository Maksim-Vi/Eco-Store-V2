import { SET_SRM_REVIEWS } from "./action";

let initialState = {
    reviews: [],
};

const reviewsReducer = (state = initialState, action) =>{
    switch (action.type) {
        case SET_SRM_REVIEWS:{
            return {...state, reviews: action.reviews}
        } 
        default:
            return state;
    }
} 


export default reviewsReducer;