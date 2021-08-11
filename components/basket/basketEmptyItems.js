import React from 'react'
import s from '../../styles/header/basketEmpty.module.scss'
import Link from 'next/link'

export default function BasketEmtyItems() {
    return (
        <div className={s.content}>
            <div className={`${s.container} ${s.containerCart}`}>
                <div className={`${s.cart}`}>
                    <h2>Корзина пустая <icon>😕</icon></h2>
                    <p>
                        Вероятней всего, Вы не выбрали еще товар.<br />
                        Для того, чтобы заказать товар, перейдите на страницу с продукцией.
                    </p>
                    <img  className={`${s.cartEmpty}`} src="/contentImg/empty-cart.png" alt="Empty cart" />
                </div>
            </div>
        </div>
    )
}
