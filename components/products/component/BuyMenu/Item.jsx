import { Avatar, Box, Card, Divider, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useBuyMenu } from '../styles';
import classNames from 'classnames';
import { count, countImgData } from '../../../../utility/utils';
import { useDispatch } from 'react-redux';
import { addItemToBasket, removeOneItemToBasket } from '../../../../redux/reducers/basket-reducer';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { v4 as uuid } from 'uuid';

const Item = (props) => {

    const classes = useBuyMenu();
    let dispatch = useDispatch()

    let [priceItems, setPriceItems] = useState(0)

    let addToBascketItem = (item = null, index = null, isEnable) => {
        if (isEnable === 'false') return

        let data = {
            id: props.item.id,
            name: props.item.name,
            price: props.item.price,
            salePrice: props.item.salePrice,
            url: props.item.images[0].url,
            countAddItems: 0,
            ImgDesc: {
                uid: item !== null ? item.uid : '',
                id: item !== null ? item.id : '',
                imgName: item !== null ? item.imgName : '',
                imgUrl: item !== null ? item.url : '',
            }
        }
        let countPrice = props.item.price - props.item.salePrice + priceItems
        setPriceItems(countPrice)
        dispatch(addItemToBasket(data))
    }

    let removeToBascketItem = (itemId, imgDescId = '', isEnable) => {
        if (isEnable === 'false') return

        if (priceItems > 0) {
            let countPrice = priceItems - (props.item.price - props.item.salePrice)
            setPriceItems(countPrice)
        }
        console.log(imgDescId);
        dispatch(removeOneItemToBasket(itemId, imgDescId))
    }

    let getBuyBtn = () => {
        if (props.item.ImgDesc.length > 0 && props.item.isItemfromSlider) {
            let item = props.item.ImgDesc[props.item.ImgDataId]
            return <Box className={classes.cardItemUpDown} component='div'>
                <p className={clsx(classes.UpDown, { [classes.disableBtn]: item.isEnable === 'false' })}
                    onClick={() => { removeToBascketItem(props.item.id, item.uid, item.isEnable) }}>-</p>
                {countImgData(props.itemBasket, item.id, props.item.id)}
                <p className={clsx(classes.UpDown, { [classes.disableBtn]: item.isEnable === 'false' })}
                    onClick={() => { addToBascketItem(item, item.id, item.isEnable) }}>+</p>
            </Box>
        } else if (props.item.ImgDesc.length === 0) {
            return <Box className={classes.cardItemUpDown} component='div'>
                <p className={classes.UpDown}
                    onClick={() => { removeToBascketItem(props.item.id) }}>-</p>
                {count(props.itemBasket, props.item.id)}
                <p className={classes.UpDown}
                    onClick={() => { addToBascketItem() }}>+</p>
            </Box>
        }
    }

    useEffect(() => {
        if (props.itemBasket.length > 0) {
            let countPrice = (props.item.price - props.item.salePrice) * count(props.itemBasket, props.item.id)
            setPriceItems(countPrice)
        }
    }, [])

    return (
        <Card className={classes.card} xs={12}>
            <Box component='div' className={classNames(`${classes.cardItem}`, { [`${classes.cardItemJustify}`]: props.item.ImgDesc.length === 0 })}>
                <Avatar variant="square" className={classes.imageProductMain} src={`${process.env.SERVER_UPLOAD_URL}/${props.item.url}`} alt="item" />
                <Box component='div' className={classes.textItemContainer}>
                    <Typography className={classes.cardItemName} variant="body1" component="h4" >{props.item.name}</Typography>
                    <Typography className={classes.itemId} variant="body1" component="span">Артикул: 100{props.item.id}</Typography>
                    <Typography className={classes.descItem} variant="body1" component="h4">Комплектация:</Typography>
                    <Typography className={classes.itemId} variant="body1" component="span">{props.item.equipment}</Typography>
                </Box>
                {getBuyBtn()}
            </Box>
            {props.item.ImgDesc.length > 0 &&
                <>
                    <Divider className={classes.divider} />
                    <Box className={classes.itemDescContainer} component='div'>
                        {props.item.ImgDesc.map((item, index) => {
                            if (item.id === props.item.ImgDataId) return

                            return (
                                <Box className={clsx(classes.itemDesc, { [classes.disable]: item.isEnable === 'false' })} key={index} display='flex' alignItems='center' margin='10px'>
                                    <Avatar variant="square" className={clsx(classes.image, { [classes.disable]: item.isEnable === 'false' })} src={`${process.env.SERVER_UPLOAD_URL}/${item.url}`} alt="item" />
                                    <Box component='span'>{item.imgName}</Box>
                                    {item.isEnable === 'false' && <Box className={classes.notInStock} component='span'>нет в наличии</Box>}
                                    <Box className={classes.cardItemUpDown} component='div'>
                                        <p className={clsx(classes.UpDown, { [classes.disableBtn]: item.isEnable === 'false' })} onClick={() => { removeToBascketItem(props.item.id, item.uid, item.isEnable) }}>-</p>
                                        {countImgData(props.itemBasket, item.id, props.item.id)}
                                        <p className={clsx(classes.UpDown, { [classes.disableBtn]: item.isEnable === 'false' })} onClick={() => { addToBascketItem(item, index, item.isEnable) }}>+</p>
                                    </Box>
                                </Box>
                            )
                        })
                        }
                    </Box>
                </>
            }

            <Divider className={classes.divider} />
            <Typography className={classes.cardItemPrice} variant="h5" component="h2" >
                итог: {priceItems} грн
            </Typography>
        </Card>
    )
}

let mapStateToProps = (state) => {
    return {
        itemBasket: state.basket.items,
    };
};

export default connect(mapStateToProps)(Item);