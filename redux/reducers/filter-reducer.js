const SET_FILTER = 'SET_FILTER';
const SET_FIND_ITEM = 'SET_FIND_ITEM';

let initialState ={
    Filter: 'all',
    findItem: ''
}

const FilterReducer = (state=initialState,action) => {
    switch (action.type) {
       
        case SET_FILTER:{
            return {...state, Filter: action.filter}
        }
        case SET_FIND_ITEM: { 
            return {
                ...state,
                findItem: action.findItem
            }  
        }         
        default:
            return state;
    }    
}

export  const setFilter = (filter) => ({ type: SET_FILTER, filter })
export const sendMessage = (findItem) => ({type: SET_FIND_ITEM, findItem })

export const setFilterMenu = (filter) => (dispatch) => {
    dispatch(setFilter(filter));
} 

export const setFilterMessage = (findItem) => (dispatch) => {
    dispatch(sendMessage(findItem));
}

export default FilterReducer