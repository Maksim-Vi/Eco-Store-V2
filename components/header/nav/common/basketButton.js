import React from 'react';
import stl from '../../../../styles/header/nav.module.scss'
import Link from 'next/link'
import { useSelector } from 'react-redux';
import { totalPriceCount } from '../../../common/utilits';

const BasketButton = () =>{
    
    const items = useSelector(state => state.basket.items)

    return (
        <Link href="/basket">
            <div style={{ marginTop: '-10px'}}>
                <button className={stl.basketBtn}>{totalPriceCount(items)} грн | 
                    <span className={stl.basketImg}></span>
                    <span style={{marginLeft: '27px'}}>{items.length}</span> 
                </button>
            </div>
        </Link>
    )
}

export default BasketButton