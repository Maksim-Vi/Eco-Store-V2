import React from 'react';
import HeaderMain from './../components/header/headerMain'
import Link from 'next/link'
import s from '../styles/header/basket.module.css'
import {  makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import BasketContent from '../components/basket/basketContent';

const useStyles = makeStyles(() => ({
    root:{
        '& .MuiButton-outlinedPrimary':{
            color:'#82ca9c;',
            border:'1px solid #82ca9c;'
        }
    }
}));



const Basket = () => {
    const classes = useStyles();
    return (
        <HeaderMain title="Eco Choice Basket">
            <div className={`${s.BasketContainer} ${classes.root}`}>  
                <div className={`${s.wrap} ${s.cf}`}>
                    <h1 className={s.projTitle}>
                        Спасибо за выбор <span>Eco Choice</span> мы всегда вам рады
                    </h1>
                    <div className={`${s.heading} ${s.cf}`}>
                        <h1>Корзина</h1>
                        <Link href="/products" as={'/products'}>
                            <Button  variant="outlined" color="primary" href="#outlined-buttons">обратно в магазин</Button>
                        </Link>
                    </div>
                </div>
                <BasketContent />
            </div>
          
        </HeaderMain>
    )
}

export default Basket