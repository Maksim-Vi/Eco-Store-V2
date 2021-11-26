import { Avatar, Divider, makeStyles } from '@material-ui/core'
import React from 'react'
import s from '../../../styles/header/basketItems.module.scss'
import { checkIsHaveDopDesc, count, countImgData } from '../../../utility/utils'

let useStyle = makeStyles((theme) => ({
    ImgMain: {
        width: theme.spacing(25),
        height: theme.spacing(15),
    },
    imgDesc: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    divider: {
        marginTop: 10
    }
}))

const BasketItem = (props) => {

    let classes = useStyle()

    let renderDeleteItem = () => {
        if (props.item.ImgDesc && props.item.ImgDesc.id === '') {
            return (
                <span className={s.ItemClose} onClick={() => { props.removeItemToBasket(props.item) }}>
                    {<span className={s.remove}>&times;</span>}
                </span>
            )
        }

    }

    let renderButtonAddDeleteItem = () => {
        if (props.item.ImgDesc && props.item.ImgDesc.id === '') {
            return (
                <>
                    <a className={s.addSubtract} onClick={() => { props.removeOneItemToBasket(props.item.id, '') }}>-</a>
                    {checkIsHaveDopDesc('', props.item, props.itemsAll) > 0 && checkIsHaveDopDesc('', props.item, props.itemsAll)}
                    <a className={s.addSubtract} onClick={() => { props.addItemToBasket(props.item) }} >+</a>
                </>
            )
        }
    }

    let renderCountMaxPrice = () => {
        if (props.item.ImgDesc && props.item.ImgDesc.id === '') {
            return (
                <h2 className={s.maxCountPrice}>
                    {(props.item.price - props.item.salePrice) * checkIsHaveDopDesc(props.item.ImgDesc.id, props.item, props.itemsAll)} грн
                </h2>
            )
        }
    }

    let renderImgDesc = () => {
        if (props.item.ImgDesc && props.item.ImgDesc.length > 0) {
            return (
                <>
                    {props.item.ImgDesc.map(item => {
                        return (
                            <div key={item.uid}>
                                <Divider className={classes.divider} />
                                <div className={s.imgDescWrapper} >
                                    <span className={s.ItemClose} onClick={() => { props.removeItemToBasket(addImgDescToBasket(props.itemsAll, item.uid)) }}>
                                        {<span className={s.remove}>&times;</span>}
                                    </span>
                                    <div className={s.imgDescContainer}>
                                        <h4>Подтип товара:</h4>
                                        <div className={s.imageText}>
                                            <Avatar variant="square" className={classes.imgDesc} src={`${process.env.SERVER_UPLOAD_URL}/${item.imgUrl}`} alt='img' />
                                            <p>Цвет: {item.imgName}</p>
                                        </div>
                                    </div>
                                    <div className={s.ChangeItemPrice}>
                                        <a className={s.addSubtract} onClick={() => { props.removeOneItemToBasket(props.item.id, item.uid) }}>-</a>
                                        {countImgData(props.itemsAll, item.id, props.item.id)}
                                        <a className={s.addSubtract} onClick={() => { props.addItemToBasket(addImgDescToBasket(props.itemsAll, item.uid)) }} >+</a>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <Divider className={classes.divider} />
                    <div className={s.totalImgDesc}>
                        <h3>Общая сумма:</h3>
                        <h2>
                            {(props.item.price - props.item.salePrice) * count(props.itemsAll, props.item.id)} грн
                        </h2>
                    </div>
                </>
            )
        }
    }

    return (
        <div className={s.basketItemContainer}>
            <div className={s.basketItem}>
                {renderDeleteItem()}
                <Avatar className={classes.ImgMain} variant="square" src={`${process.env.SERVER_UPLOAD_URL}/${props.item.url}`} alt='img' />
                <div className={s.ItemContentContainer}>
                    <h3>{props.item.name}</h3>
                    <span className={s.articl}>Артикул: 100{props.item.id}</span>
                    <div className={s.PriceContainer}>
                        <div className={s.ItemPrice}>
                            <span>Цена:</span>
                            <span className={s.price}>{props.item.price - props.item.salePrice} грн/шт</span>
                        </div>

                        <div className={s.CountPriceContainer}>
                            <div className={s.ChangeItemPrice}>
                                {renderButtonAddDeleteItem()}
                            </div>
                            {renderCountMaxPrice()}
                        </div>
                    </div>
                </div>
            </div>

            {renderImgDesc()}
        </div>
    )
}

let addImgDescToBasket = (allItems, uid) => {
    let data = allItems.filter(item => item.ImgDesc.uid === uid)
    return data[0]
}

export default BasketItem
