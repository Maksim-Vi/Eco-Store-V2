import { getPopularApi } from '../../API/api'

const SET_POPULAR = 'SET_POPULAR'


let initialState ={
    popularProduct:[],
}

const PopularReducer = (state=initialState,action) => {
    switch (action.type) {
        case SET_POPULAR:{
            return {...state,popularProduct: action.popular}
        }
        default:
            return state;
    }    
}

export  const setPopular = (popular) => ({ type: SET_POPULAR, popular })

export const PopularApi = () => async (dispatch) => {
    let data = await getPopularApi()    
    dispatch(setPopular(data)); 
} 

export default PopularReducer;
