import React, { useState } from 'react'
import s from '../../../styles/header/basketItems.module.scss'
import CreateOrder from '../CreateOrder/createOrder'
import BasketItem from './basketItem'
import BasketTotal from './basketTotal'
import { v4 as uuid } from 'uuid';

const BasketItems = (props) => {

    let [createOrder, setCreateOrder] = useState(false)

    React.useEffect(() => {
        setCreateOrder(false)
    }, [])

    return (
        <div className={s.basketItemsContainer}>
            {!createOrder
                ? <>
                    <div className={s.basketItemsContainer}>
                        {props.itemsSort.map(item => {
                            return <BasketItem key={uuid()}
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
                </>
                : <div className={s.basketItemsContainer}>
                    <CreateOrder setCreateOrder={setCreateOrder} />
                </div>
            }
        </div>
    )
}

export default BasketItems