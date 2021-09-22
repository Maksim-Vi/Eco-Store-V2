import { Avatar, Divider, makeStyles } from '@material-ui/core'
import React from 'react'
import s from '../../../styles/header/basketItems.module.scss'
import { checkIsHaveDopDesc, count, countImgData } from '../../../utility/utils'

let useStyle = makeStyles((theme) => ({
    ImgMain:{
        width: theme.spacing(25),
        height: theme.spacing(15),
    },
    imgDesc:{
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    divider:{
        marginTop: 10
    }
}))

const BasketItem = (props) => {

    let classes = useStyle()
  
    return (
        <div className={s.basketItemContainer}>
            <div className={s.basketItem}>
                <span className={s.ItemClose} onClick={() => { props.removeItemToBasket(props.item) }}>{
                    <a href="#delete" className={s.remove}>&times;</a>
                }</span>
                <Avatar className={classes.ImgMain} variant="square" src={`${props.item.url}`} alt='img'/>
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
                                {/* <a className={s.addSubtract} onClick={() => { props.removeOneItemToBasket(props.item.id) }}>-</a> */}
                                <a className={s.addSubtract} onClick={() => { props.removeOneItemToBasket(props.item.id,props.item.ImgDesc.id) }}>-</a>
                                {checkIsHaveDopDesc(props.item.ImgDesc.id,props.item,props.itemsAll) > 0 && checkIsHaveDopDesc(props.item.ImgDesc.id,props.item,props.itemsAll)}
                                <a className={s.addSubtract} onClick={() => { props.addItemToBasket(props.item) }} >+</a>
                            </div>
                            <h2 className={s.maxCountPrice}>
                                {(props.item.price - props.item.salePrice) * checkIsHaveDopDesc(props.item.ImgDesc.id,props.item,props.itemsAll)} грн
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        
            {props.item.ImgDesc.id !== '' &&
                <>
                    <Divider className={classes.divider}/>
                    <div className={s.imgDescContainer}>
                        <h4>Подтип товара:</h4>
                        <div className={s.imageText}>
                            <Avatar  variant="square" className={classes.imgDesc} src={`${props.item.ImgDesc.imgUrl}`} alt='img' />
                            <p>Цвет: {props.item.ImgDesc.imgName}</p>
                        </div>                
                    </div>    
                </>   
            }
        </div>
    )
}

export default BasketItem
