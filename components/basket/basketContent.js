import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import BasketEmtyItems from './basketEmptyItems'
import BasketItems from './BasketItems/basketItems'
import { removeItemToBasket, addItemToBasket, removeOneItemToBasket } from '../../redux/reducers/basket-reducer';
import uniqBy from 'lodash/uniqBy';
import _ from 'lodash';


const BasketContent = (props) => {
    let basket = {
        margin: '0 auto',
        width: '95%'
    }

    return (
        <div style={basket}>
            {props.itemsAll !== undefined && props.itemsAll !== null && props.itemsAll.length !== 0
                ? <BasketItems itemsSort={props.itemsSort}
                    itemsAll={props.itemsAll}
                    removeOneItemToBasket={props.removeOneItemToBasket}
                    addItemToBasket={props.addItemToBasket}
                    removeItemToBasket={props.removeItemToBasket} />
                : <BasketEmtyItems />
            }

        </div>
    )
}

let sortBasketItem = (items) => {
    const data = _.uniqBy(items, i => [i.id, i.ImgDesc.id].join())  
    const updateData = sortSameItems(data)
    return updateData
}

let sortSameItems = (items) =>{
    let data = []
    let prevId = -1
    items.forEach(item => {
        if(prevId === item.id){
            data.find(i=>{
                if(i.id === item.id && i.ImgDesc.uid !== item.ImgDesc.uid){
                    let updateImgDesc = i.ImgDesc
                    updateImgDesc.push(item.ImgDesc)
                    return {...i, ImgDesc: updateImgDesc}
                }
            })
        } else {
            prevId = item.id
            let imgDesc = item.ImgDesc && item.ImgDesc.id !== '' ? [item.ImgDesc] : item.ImgDesc
            let updateItem = {...item,ImgDesc: imgDesc}
            data.push(updateItem)
        }
    });
   return data
}

let mapStateToProps = (state) => {
    return {
        itemsSort: sortBasketItem(state.basket.items),
        itemsAll: state.basket.items
    }
}

export default compose(
    connect(mapStateToProps, { removeItemToBasket, addItemToBasket, removeOneItemToBasket })
)(BasketContent)