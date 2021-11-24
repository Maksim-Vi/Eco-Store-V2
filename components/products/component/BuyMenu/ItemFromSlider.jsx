import { Avatar, Box, Card, Divider, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useBuyMenu } from '../styles';
import classNames from 'classnames';
import { count, countImgData } from '../../../../utility/utils';
import { useDispatch } from 'react-redux';
import { addItemToBasket, removeOneItemToBasket } from '../../../../redux/reducers/basket-reducer';
import { connect } from 'react-redux';
import clsx from 'clsx';

const ItemFromSlider = () => {

    const classes = useBuyMenu();
    let dispatch = useDispatch()

    let [priceItems, setPriceItems] = useState(0)

    let addToBascketItem = (item = null, index = null, isEnable) => {
        if (isEnable === 'false') return

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
        dispatch(removeOneItemToBasket(itemId, imgDescId))
    }

    useEffect(() => {
        if (props.itemBasket.length > 0) {
            let countPrice = (props.item.price - props.item.salePrice) * count(props.itemBasket, props.item.id)
            setPriceItems(countPrice)
        }
    }, [])

    return (
        <Card className={classes.card} xs={12}>
            <Box component='div' className={classNames(`${classes.cardItem}`, { [`${classes.cardItemJustify}`]: ImgDesc.length === 0 })}>
                <Avatar variant="square" className={classes.imageProductMain} src={`${process.env.SERVER_UPLOAD_URL}/${props.item.images[0].url}`} alt="item" />
                <Box component='div' className={classes.textItemContainer}>
                    <Typography className={classes.cardItemName} variant="body1" component="h4" >{props.item.name}</Typography>
                    <Typography className={classes.itemId} variant="body1" component="span">Артикул: 100{props.item.id}</Typography>
                    <Typography className={classes.descItem} variant="body1" component="h4">Комплектация:</Typography>
                    <Typography className={classes.itemId} variant="body1" component="span">{props.item.equipment}</Typography>
                </Box>
                {ImgDesc.length === 0 &&
                    <Box className={classes.cardItemUpDown} component='div'>
                        <p className={classes.UpDown} onClick={() => { removeToBascketItem(props.item.id) }}>-</p>
                        {count(props.itemBasket, props.item.id)}
                        <p className={classes.UpDown} onClick={() => { addToBascketItem() }}>+</p>
                    </Box>
                }
            </Box>
            {props.item.ImgDesc.length > 0 &&
                <>
                    <Divider className={classes.divider} />
                    <Box className={classes.itemDescContainer} component='div'>
                        {props.item.ImgDesc.map((item, index) => {
                            return (
                                <Box className={clsx(classes.itemDesc, { [classes.disable]: item.isEnable === 'false' })} key={index} display='flex' alignItems='center' margin='10px'>
                                    <Avatar variant="square" className={clsx(classes.image, { [classes.disable]: item.isEnable === 'false' })} src={`${process.env.SERVER_UPLOAD_URL}/${item.url}`} alt="item" />
                                    <Box component='span'>{item.imgName}</Box>
                                    <Box className={classes.cardItemUpDown} component='div'>
                                        <p className={clsx(classes.UpDown, { [classes.disableBtn]: item.isEnable === 'false' })} onClick={() => { removeToBascketItem(props.item.id, item.uid, item.isEnable) }}>-</p>
                                        {countImgData(props.itemBasket, item.id, props.item.id)}
                                        <p className={clsx(classes.UpDown, { [classes.disableBtn]: item.isEnable === 'false' })} onClick={() => { addToBascketItem(item.isEnable) }}>+</p>
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