const SET_REVIEWS = 'SET_REVIEWS'

let initialState = {
    reviewsStore: [],
};

const reviewsStoreReducer = (state = initialState, action) =>{
    switch (action.type) {
        case SET_REVIEWS:{
            return {...state, reviewsStore: action.reviews}
        } 
        default:
            return state;
    }
} 

export  const setReviewsStore = (reviews) => ({ type: SET_REVIEWS, reviews })

export default reviewsStoreReducer;