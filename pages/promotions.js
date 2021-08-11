import React from 'react';
import HeaderMain from '../components/header/headerMain';
import Promotion from '../components/promotion/Promotion';
import s from '../styles/promotion.module.scss'

const Promotions = () =>{
    return (
        <HeaderMain title="Eco Choice promotions">
            {true
                ? <Promotion />
                : <div className={s.banner_not_promotion}>
                    <h3>К сожалению, акций на данный момент нету.</h3>
                    <p>Но вы не расстраивайтесь, переодически просматривайте эту страницу, акции бывают часто!<icon>&#128512;</icon></p>
                    <img src="/banner-akcii-net.png" />
                </div>
            }
        </HeaderMain>
    )
}

export default Promotions