import { Avatar, Box, Card, Divider, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useBuyMenu } from '../styles';
import classNames from 'classnames';
import { count, countImgData } from '../../../../utility/utils';
import { useDispatch } from 'react-redux';
import { addItemToBasket, removeOneItemToBasket } from '../../../../redux/reducers/basket-reducer';
import { connect } from 'react-redux';

const Item = (props) => {

    const classes = useBuyMenu();
    let dispatch = useDispatch()

    let [ImgDesc, setImgDesc] = useState([])
    let [priceItems, setPriceItems] = useState(0)
  
    let addToBascketItem = (item = null,index = null) => {
        let data = {
            id: props.item.id,
            name: props.item.name,
            price: props.item.price,
            salePrice:props.item.salePrice,
            url: props.item.images[0].url.split('public')[1],
            countAddItems: 0,
            ImgDesc:{
                id: item !== null ? item.id : '',
                imgName: item !== null ? item.imgName : '',
                imgUrl: item !== null ? item.url.split('public')[1] : '',
            }
        }
        let countPrice = props.item.price - props.item.salePrice + priceItems
        setPriceItems(countPrice)
        dispatch(addItemToBasket(data))
    }

    let removeToBascketItem = (itemId,imgDescId = '') => {
        if(priceItems > 0){
            let countPrice =  priceItems - (props.item.price - props.item.salePrice)
            setPriceItems(countPrice)
        }
        dispatch(removeOneItemToBasket(itemId,imgDescId))
    }

    useEffect(() => {
        if (props.item.imagesDescription && props.item.imagesDescription.length > 0) {
            let imagesDescription = []
            props.item.imagesDescription.forEach((imgData, index) => {
                if (props.item.ImgData) {
                    let data = {
                        id: props.item.ImgData[index].id,
                        url: imgData.url,
                        imgName: props.item.ImgData[index].imgName,
                        count: props.item.ImgData[index].count
                    }
                    imagesDescription.push(data)
                }
            })
            setImgDesc(imagesDescription)
        }
        if(props.itemBasket.length > 0){
            let countPrice = (props.item.price - props.item.salePrice) * count(props.itemBasket,props.item.id)
            setPriceItems(countPrice)
        }
    }, [])

    return (
        <Card className={classes.card} xs={12}>
            <Box component='div' className={classNames(`${classes.cardItem}`, { [`${classes.cardItemJustify}`]: ImgDesc.length === 0 })}>
                <Avatar variant="square" className={classes.imageProductMain} src={`${props.item.images[0].url.split('public')[1]}`} alt="item" />
                <Box component='div' className={classes.textItemContainer}>
                    <Typography className={classes.cardItemName} variant="p" component="h4" >{props.item.name}</Typography>
                    <Typography className={classes.itemId} variant="p" component="span">Артикул: 100{props.item.id}</Typography>
                    <Typography className={classes.itemId} variant="p" component="h4">Комплектация:</Typography>
                    <Typography className={classes.itemId} variant="p" component="span">{props.item.equipment}</Typography>
                </Box>
                {ImgDesc.length === 0 &&
                    <Box className={classes.cardItemUpDown} component='div'>
                        <p className={classes.UpDown} onClick={() => { removeToBascketItem(props.item.id) }}>-</p>
                        {count(props.itemBasket,props.item.id)}
                        <p className={classes.UpDown} onClick={() => { addToBascketItem() }}>+</p>
                    </Box>
                }
            </Box>
            {ImgDesc.length > 0 &&
                <>
                    <Divider className={classes.divider} />
                    <Box className={classes.itemDescContainer} component='div'>
                        {ImgDesc.map((item, index) => {
                            return (
                                <Box className={classes.itemDesc} key={index} display='flex' alignItems='center' margin='10px'>
                                    <Avatar variant="square" src={`${item.url.split('public')[1]}`} alt="item" />
                                    <Box component='span'>{item.imgName}</Box>
                                    <Box className={classes.cardItemUpDown} component='div'>
                                        <p className={classes.UpDown} onClick={() => { removeToBascketItem(props.item.id,item.id) }}>-</p>
                                        {countImgData(props.itemBasket,item.id)}
                                        <p className={classes.UpDown} onClick={() => { addToBascketItem(item,index) }}>+</p>
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