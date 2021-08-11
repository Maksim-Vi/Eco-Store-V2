import orderBy from 'lodash/orderBy';
import { useSelector } from 'react-redux';
import constants from '../constants/constants'

export const totalPriceCount = (item) =>{
    let initialValue = 0;
    return item.reduce((total, item) => total+(item.price-item.salePrice), initialValue)
}

export const sortBy = (items,Filter) =>{
    switch (Filter) {
      case 'all':{
        return items
      }
      case 'expensive':{
        return orderBy(items, 'price','desc')
      }
      case 'cheap':{
        return orderBy(items, 'price','asc')
      }
      default:
        return items
    }
}

let FilterItems = (items, findItem) =>{
  if(items === null && items === undefined && items.length === 0){
    return null
  } else {
    return items.filter( 
      item =>
        item.name.toLowerCase().indexOf(findItem.toLowerCase()) >=0)
  }
}
  
export const searchItem = (items, findItem, Filter) =>{
  return  sortBy(FilterItems(items,findItem),Filter)
}

export const addedCountItem = (itemBasket,itemId) => {
    return itemBasket.reduce((count, item) => {
      return count + (item.id === itemId ? 1 : 0)
    }, 0)
}

export const Filter = (items,popularProduct,id) =>{
  return items.filter(function(v) {
      return popularProduct.some(function(v2) {
          return v.id === v2.id
      }
  )}).find(function(v){return v.id === id})
}  

export const sortItemByType = (items) =>{

  const itemDropdownMenu = useSelector(state => state.store.itemDropdownMenu)

  if (itemDropdownMenu === null){
    return items
  } else if(itemDropdownMenu === '1') {
        return items
  } else {
    return items.filter(item => item.category.toLowerCase() === itemDropdownMenu)
  } 

}

export const getDescProductToSeo = (id) =>{
  switch(id){
    case 'ID_1001': {
      return constants.ID_1001
    }
    case 'ID_1002': {
      return constants.ID_1002
    }
    case 'ID_1003': {
      return constants.ID_1003
    }
    case 'ID_1004': {
      return constants.ID_1004
    }
    case 'ID_1005': {
      return constants.ID_1005
    }
    case 'ID_1006': {
      return constants.ID_1006
    }
    case 'ID_1007': {
      return constants.ID_1007
    }
    case 'ID_1008': {
      return constants.ID_1008
    }
    case 'ID_1009': {
      return constants.ID_1009
    }
    case 'ID_10010': {
      return constants.ID_1010
    }
    case 'ID_10011': {
      return constants.ID_1011
    }
    case 'ID_10012': {
      return constants.ID_1012
    }
    case 'ID_10013': {
      return constants.ID_1013
    }
    case 'ID_10014': {
      return constants.ID_1014
    }
    case 'ID_10015': {
      return constants.ID_1015
    }
    case 'ID_10016': {
      return constants.ID_1016
    }
    case 'ID_10017': {
      return constants.ID_1017
    }
    case 'ID_10018': {
      return constants.ID_1018
    }
    case 'ID_10019': {
      return constants.ID_1019
    }
    case 'ID_10020': {
      return constants.ID_1020
    }
    case 'ID_10021': {
      return constants.ID_1011
    }
    case 'ID_10022': {
      return constants.ID_1012
    }
    case 'ID_10023': {
      return constants.ID_1013
    }
    case 'ID_10024': {
      return constants.ID_1014
    }
    case 'ID_10025': {
      return constants.ID_1015
    }
    case 'ID_10026': {
      return constants.ID_1026
    }
    default :{
      return ''
    }
  }

}
