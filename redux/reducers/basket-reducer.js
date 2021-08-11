const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEMS = 'REMOVE_ITEMS'
const REMOVE_ONE_ITEM_FROM_ARR = 'REMOVE_ONE_ITEM_FROM_ARR'
const ADD_ITEM_FROM_STORAGE = 'ADD_ITEM_FROM_STORAGE'
const REMOVE_ALL_ITEMS = 'REMOVE_ALL_ITEMS'

let initialState ={
    items: []
}

const addItemToArr = (arr,item) =>{
    let items = [...arr,item]
    if(items.length > 2){
        items.sort((a,b)=> {
            return a.id - b.id
        })
    }  
    return items
}

const sortItem = (items,id) =>{
    let firstArr = []
    let secondArr = []

    items.forEach((item) => {
        if(item.id === id){
            secondArr.push(item)
        } else if (item.id !== id){
            firstArr.push(item)
        }
    })
    secondArr.splice(0,1)
    let filtItems = secondArr.concat(firstArr)
  
    let sortArr = items.reduce( (a,c,i) => {a[c.id] = i; return a }, {});
    let sortItem = filtItems.sort( (a,b) => {return sortArr[a.id] - sortArr[b.id]} );
    
    // console.log(items);
    // console.log();
    return sortItem
}



const BasketReducer = (state=initialState,action) => {
    switch (action.type) {
        case ADD_ITEM:{
            return { 
                ...state,
                // items:[...state.items, action.itemStore ]}               
                items: addItemToArr(state.items,action.itemStore)
            }
        }
        case ADD_ITEM_FROM_STORAGE:{
            return { 
                ...state,
                items: action.itemStorage.forEach((value, index, array) => {return array})            
               
            }
        }
        case REMOVE_ONE_ITEM_FROM_ARR:{
            return { 
                ...state,
                // items: state.items.find(i=>  i.id == action.id ).filter(i=> i.id !== action.id )
                // items: {...state.items.filter(i => i.id !== action.id).slice(0,1)}
                items: sortItem(state.items,action.id)
               
            }
        } 
        case REMOVE_ITEMS:{
            return { 
                ...state,
                items: state.items.filter(i=> i.id !== action.id )
            }
        } 
        case REMOVE_ALL_ITEMS:{
            return {
                ...state,
                items: []
            }
        } 

        default:
            return state;
    }    
}

export const addItemStore = (itemStore) => ({type: ADD_ITEM, itemStore })
export const removeAllItemStore = () => ({type: REMOVE_ALL_ITEMS})
export const removeItemStore = (remove) => ({type: REMOVE_ITEMS, id:remove })
export const removeOneItemStore = (remove) => ({type: REMOVE_ONE_ITEM_FROM_ARR, id:remove })
export const addItemFromStore = (itemStorage) => ({type: ADD_ITEM_FROM_STORAGE, itemStorage })

export const addItemToBasket = (itemStore) =>  (dispatch) => {
    // let storage = sessionStorage.setItem('basket', JSON.stringify(initialState.items))
    dispatch(addItemStore(itemStore))
} 

export const removeItemToBasket = (remove) =>  (dispatch) => {
    dispatch(removeItemStore(remove))
} 

export const removeOneItemToBasket = (remove) =>  (dispatch) => {
    dispatch(removeOneItemStore(remove))
} 

export default BasketReducer