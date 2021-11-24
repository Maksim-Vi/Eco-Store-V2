import { getStoreApi } from '../../API/api';

const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const SET_STORE = 'SET_STORE';
const ITEM_DROPDOWN_MENU = 'ITEM_DROPDOWN_MENU'

let initialState ={
    items: [],
    isFetching: false,
    itemDropdownMenu: null
}

// let updateDataStore = (items) =>{
//     let updateItems = []

//     items.forEach(item => {
//         if(item.ImgData && item.ImgData.length > 0){
//             let newData = item.ImgData.map(i=>{
//                 return {
//                     id: i.id,
//                     uid: uuid(),
//                     isEnable: i.isEnable,
//                     imgName: i.imgName,
//                 }
//             })
//             updateItems.push(newData)
//         } else {
//             updateItems.push(item)
//         }
//     });

//     return updateItems
// }

const StoreReducer = (state=initialState,action) => {
    switch (action.type) {
        case TOGGLE_IS_FETCHING:{
            return {...state, isFetching: action.togglePreloader}
        }
        case SET_STORE:{
            return {...state, items:action.store}
            //return {...state, items: updateDataStore(action.store)}
        }
        case ITEM_DROPDOWN_MENU:{
            return {...state, itemDropdownMenu:action.itemDropdownMenu}
        }
        default:
            return state;
    }    
}

export  const setStore = (store) => ({ type: SET_STORE, store })
export  const toggleIsFetching = (togglePreloader) => ({ type: TOGGLE_IS_FETCHING, togglePreloader })
export  const setItemDropdownMenu = (itemDropdownMenu) => ({ type: ITEM_DROPDOWN_MENU, itemDropdownMenu })


export const requastStore =  () => async (dispatch)  => {
    dispatch(toggleIsFetching(true));
    const data = await getStoreApi()
    dispatch(toggleIsFetching(false));
    dispatch(setStore(data));
} 

export default StoreReducer;


