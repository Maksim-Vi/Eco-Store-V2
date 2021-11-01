import React from 'react';
import s from '../../../styles/header/dropDownPopup.module.css'
import Link from 'next/link'

const ListProductsTop = (props) => {
    return (<>
        {props.open &&
            <div className={s.listProductsTopPNav}>
                <h1 className={s.title}>Топ продаж</h1>
                <Link href="/product/1">
                    <div className={s.itemContent}>
                        <p>Столовые приборы с палочками</p>
                        <img src="/contentImg/pribors.png"/>
                    </div>
                </Link>
                <Link href="/product/3">
                    <div className={s.itemContent}>
                        <p>Зубные щетки</p>
                        <img src="/contentImg/shetki.png"/>
                    </div>
                </Link>
                <Link href="/product/24">
                    <div className={s.itemContent}>
                        <p>Бокс «Эко максимум»</p>
                        <img src="/contentImg/box.png"/>
                    </div>
                </Link>
            </div>
        }
    </>)
}

export default ListProductsTop

// onClick={()=>{dispatch(setItemDropdownMenu('бокс'))}}