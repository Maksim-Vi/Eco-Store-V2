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

// const sortItem = (items,id) =>{
//     let firstArr = []
//     let secondArr = []

//     items.forEach((item) => {
//         if(item.id === id){
//             secondArr.push(item)
//         } else if (item.id !== id){
//             firstArr.push(item)
//         }
//     })
//     secondArr.splice(0,1)
//     let filtItems = secondArr.concat(firstArr)
  
//     let sortArr = items.reduce( (a,c,i) => {a[c.id] = i; return a }, {});
//     let sortItem = filtItems.sort( (a,b) => {return sortArr[a.id] - sortArr[b.id]} );
    
//     return sortItem
// }

const removeOneSortItem = (items,id,imgDescId) =>{
    let firstArr = []
    let secondArr = []

    items.forEach((item) => {
        if(imgDescId !== ''){
            if(imgDescId === item.ImgDesc.id){
                secondArr.push(item)
            } else if (imgDescId !== item.ImgDesc.id){
                firstArr.push(item)
            }
        } else {
            if(item.id === id){
                secondArr.push(item)
            } else if (item.id !== id){
                firstArr.push(item)
            }
        }
    })

    secondArr.splice(0,1)
    let filtItems = secondArr.concat(firstArr)
  
    // let sortArr = items.reduce( (a,c,i) => {
    //     if(c.ImgDesc.id !== ''){
    //         a[c.ImgDesc.id] = i; return a 
    //     } else {
    //         a[c.id] = i; return a 
    //     }
    // }, {});
    // let sortItem = filtItems.sort( (a,b) => {return sortArr[a.ImgDesc.id] - sortArr[b.ImgDesc.id] || sortArr[a.id] - sortArr[b.id] } );
    let sortItem = filtItems.sort( (a,b) => {return a.id - b.id || a.ImgDesc.id - b.ImgDesc.id} );
    
    return sortItem
}

let removeItem = (items,removeItem) =>{
    if(removeItem.ImgDesc.id !== ''){
        return items.filter(i=> i.ImgDesc.id !== removeItem.ImgDesc.id )
    } else {
        return items.filter(i=> i.id !== removeItem.id )
    }
}



const BasketReducer = (state=initialState,action) => {
    switch (action.type) {
        case ADD_ITEM:{
            return { 
                ...state,         
                items: addItemToArr(state.items,action.itemStore)
            }
        }
        // case ADD_ITEM_FROM_STORAGE:{
        //     return { 
        //         ...state,
        //         items: action.itemStorage.forEach((value, index, array) => {return array})            
               
        //     }
        // }
        case REMOVE_ONE_ITEM_FROM_ARR:{
            return { 
                ...state,
                items: removeOneSortItem(state.items,action.id,action.imgDescId)
            }
        } 
        case REMOVE_ITEMS:{
            return { 
                ...state,
                // items: state.items.filter(i=> i.id !== action.id )
                items: removeItem(state.items,action.item)
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
export const removeItemStore = (remove) => ({type: REMOVE_ITEMS, item: remove })
export const removeOneItemStore = (remove,imgDescId) => ({type: REMOVE_ONE_ITEM_FROM_ARR, id:remove, imgDescId: imgDescId})
// export const addItemFromStore = (itemStorage) => ({type: ADD_ITEM_FROM_STORAGE, itemStorage })

export const addItemToBasket = (itemStore) =>  (dispatch) => {
    dispatch(addItemStore(itemStore))
} 

export const removeItemToBasket = (remove) =>  (dispatch) => {
    dispatch(removeItemStore(remove))
} 

export const removeOneItemToBasket = (remove,imgDescId) =>  (dispatch) => {
    dispatch(removeOneItemStore(remove,imgDescId))
} 

export default BasketReducer