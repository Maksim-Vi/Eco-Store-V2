import React from 'react';
import { connect } from "react-redux";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import s from '../../styles/content/products.module.scss'
import Link from "next/link";
import { addItemToBasket } from '../../redux/reducers/basket-reducer';
import { useDispatch } from 'react-redux';
import { addedCountItem } from '../common/utilits';

const ListProduct = (props) => {

    let dispatch = useDispatch()
    
    return (
        <li className={s.Card}>
            <Card variant="outlined" className={s.CardItem}>
                <CardContent>
                        <Typography className={s.CardCode} color="textSecondary" gutterBottom>
                            код товара 100{props.item.id}
                        </Typography>
                        <Link href={{ pathname: `/product/${props.item.id}`, query: { name: 'test' } }} as={`/product/${props.item.id}`} >
                            <img className={s.CardImage} src={`${props.item.images[0].url.split('public')[1]}`} alt="item" />
                        </Link>
                        <Typography className={s.CardTitleText} variant="body2" component="h2" >
                            {props.item.name}
                        </Typography>
                    <div className={s.CardPriceContainer}>
                        {props.item.sale
                            ? <Typography className={s.CardSale} variant="body2" component="p">
                                <strike style={{ color: 'red' }}>
                                    <span>{props.item.price}грн</span>
                                </strike>
                            </Typography>
                            : <Typography className={s.CardSale} variant="body2" component="p"></Typography>

                        }

                        <Typography className={s.CardInStore} variant="body2" component="p">
                            {props.item.inStock
                                ? <span>в наличии</span>
                                : <span style={{ color: 'red' }}>нет в наличии</span>
                            }
                        </Typography>
                    </div>
                    <div className={s.CardBottomContainer}>
                        <Typography className={s.CardPrice} variant="body2" component="p">
                            цена: <span style={{ color: 'green', fontSize: '22px' }}>
                                {props.item.sale
                                    ? (props.item.price - props.item.salePrice)
                                    : props.item.price
                                }грн
                                </span>
                        </Typography>

                        <button className={s.CardBtn} disabled={props.item.inStock === false} onClick={() => { dispatch(addItemToBasket(props.item)) }}>
                            <p className={s.BtnInBasket}>в корзину</p>
                            <img className={s.BtnImg} src="/contentImg/products/buy2.png" alt="" />
                            <span>{addedCountItem(props.itemBasket,props.item.id) > 0 && `(${addedCountItem(props.itemBasket,props.item.id)})`}</span>
                        </button>

                    </div>
                </CardContent>
            </Card>
        </li>
    )
}

let mapStateToProps = (state) => {
    return {
      itemBasket: state.basket.items,
    };
};

export default connect(mapStateToProps)(ListProduct);