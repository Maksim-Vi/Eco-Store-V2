import React from 'react'
import s from '../../../styles/header/basketItems.module.scss'

const BasketItem = (props) => {

    let count = (item, itemId) =>{
        return item.reduce((count, item) => {
          return count + (item.id === itemId ? 1 : 0)
        }, 0)
    }
    let URL = process.env.SERVER_URL
    return (
        <div className={s.basketItem}>
            <span className={s.ItemClose} onClick={()=>{props.removeItemToBasket(props.item.id)}}>{
               <a href="#delete" className={s.remove}>&times;</a>
            }</span>
            <div className={s.ItemImg}>
                <img src={`${URL}/${props.item.image}`} alt='img' />
            </div>
            <div className={s.ItemContentContainer}>
                <h3>{props.item.name}</h3>
                <span className={s.articl}>Артикул: 1000{props.item.id}</span>
                <div className={s.PriceContainer}>
                    <div className={s.ItemPrice}>
                        <span>Цена:</span>
                        <span className={s.price}>{props.item.price - props.item.salePrice} грн/шт</span>
                    </div>

                    <div className={s.CountPriceContainer}>
                        <div className={s.ChangeItemPrice}>
                            <a className={s.addSubtract} onClick={()=>{props.removeOneItemToBasket(props.item.id)}}>-</a>
                            {count(props.itemsAll, props.item.id) > 0 && count(props.itemsAll, props.item.id)}
                            <a className={s.addSubtract} onClick={()=>{props.addItemToBasket(props.item)}} >+</a>
                        </div>
                        <h2 className={s.maxCountPrice}>{(props.item.price - props.item.salePrice) * count(props.itemsAll, props.item.id)} грн</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BasketItem
