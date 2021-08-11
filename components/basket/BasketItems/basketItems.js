import React, { useState } from 'react'
import s from '../../../styles/header/basketItems.module.scss'
import CreateOrder from '../CreateOrder/createOrder'
import BasketItem from './basketItem'
import BasketTotal from './basketTotal'

const BasketItems = (props) => {

    const [createOrder, setCreateOrder] = useState(false)

    return (
        <div className={s.basketItemsContainer}>
            <div className={s.basketItemsContainer}>
                {props.itemsSort.map(item=>{
                    return  <BasketItem key={item.id} 
                                        item={item} 
                                        itemsAll={props.itemsAll} 
                                        removeOneItemToBasket={props.removeOneItemToBasket} 
                                        addItemToBasket={props.addItemToBasket} 
                                        removeItemToBasket={props.removeItemToBasket} />
                })
                }
            </div>
            <div className={s.basketItemsTotal}>
                <BasketTotal setCreateOrder={setCreateOrder} itemsAll={props.itemsAll} />
            </div>
            {createOrder
                ? <div className={s.basketStepperContainer}>
                    <CreateOrder setCreateOrder={setCreateOrder} />
                </div>
                : null
            }
        </div>
    )
}

export default BasketItems