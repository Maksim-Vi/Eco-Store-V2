import React, {useEffect, useState } from 'react';
import { connect } from "react-redux";
import { useDispatch } from 'react-redux';
import { Typography } from '@material-ui/core';
import CaruselProduct from '../../components/products/productCarusel';
import ProductTable from '../../components/products/productTable';
import { addItemToBasket } from '../../redux/reducers/basket-reducer';
import s from '../../styles/content/product.module.scss'
import { addedCountItem } from '../common/utilits';
import ABS from '../common/abs';
import ProductsImgData from './productsImgData';

const ProductId = (props) => {
    
    let dispatch = useDispatch()
    let [tableData, setTableData] = useState({
        typeName: '',
        countPeople: '',
        features: '',
        eco: '',
        equipment: '',
        structure: ''
    })

    useEffect(()=>{
        setTableData({
            typeName: props.item.typeName,
            countPeople: props.item.countPeople,
            features: props.item.features,
            eco: props.item.eco,
            equipment: props.item.equipment,
            structure: props.item.structure
        })
    },[])
    

    return (
        <section className={s.sectionProduct}>
            <div className={s.ProductContainer}>
                <div className={s.ContainerHeader}>
                    <div className={s.CaruselProduct}>
                        <CaruselProduct item={props.item}/>
                    </div>
                    <div className={s.TitleProduct}>
                        <h2>{props.item.nameDescription}</h2>
                        <div className={s.ProductBayCard}>
                            <p className={s.CardCode}>код товара 100{props.item.id}</p>
                            <div className={s.CardPriceContainer}>
                                {props.item.sale
                                    ?<Typography className={s.CardSale} variant="body2" component="p">
                                            <strike style={{ color: 'red' }}>
                                                <span>{props.item.price}грн</span>
                                            </strike>
                                        </Typography>
                                    : <Typography className={s.CardSale} variant="body2" component="p"></Typography>
                                }

                                <Typography className={s.CardInStore} variant="body2" component="p">
                                    {props.item.inStock
                                        ? <span>в наличии</span>
                                        : <span style={{color:'red'}}>нет в наличии</span>
                                    }
                                </Typography>
                            </div>
                            <div className={s.CardBottomContainer}>
                                <Typography className={s.CardPrice} variant="body2" component="p">
                                    цена: <span style={{ color: 'green' }}>
                                        {props.item.sale
                                            ?  (props.item.price - props.item.salePrice)
                                            :  props.item.price
                                        }грн
                                    </span>
                                </Typography>

                                <button className={s.CardBtn} disabled={props.item.inStock === false} onClick={()=>{dispatch(addItemToBasket(props.item))}}>
                                    <p className={s.BtnInBasket}>в корзину</p>
                                    <img className={s.BtnImg} src="/contentImg/products/buy2.png" alt="buy" />
                                    <span>{addedCountItem(props.itemBasket,props.item.id) > 0 && `(${addedCountItem(props.itemBasket,props.item.id)})`}</span>
                                </button>
                            </div>
                        </div>
                        <ProductsImgData item={props.item}/>
                    </div>
                </div>
                <div className={s.ContainerMiddle}>
                    <h2>Описание:</h2>
                    <hr />
                    <p>{props.item.description}</p>
                </div>
                <ABS slotId={'1040'} width={100} height={200} />
                <div className={s.ContainerFooter}>
                    <h2>Общие характеристики:</h2>
                    <hr />
                    <ProductTable itemDescTable={tableData}/>

                    {/* <div className={s.SameProducts}>
                            похожие товары 
                        </div> */}
                </div>
            </div>
        </section>)
}

let mapStateToProps = (state) => {
    return {
      itemBasket: state.basket.items,
    };
};

export default connect(mapStateToProps)(ProductId);