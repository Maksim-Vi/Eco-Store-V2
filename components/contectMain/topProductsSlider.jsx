import { Avatar } from '@material-ui/core'
import React from 'react'
import stl from '../../styles/sliderStyles/topProductsSlider.module.scss'
import CarouselWithButtons from '../../utility/Carousels/CarouselWithButtons';
import Link from "next/link";
import classNames from 'classnames';
import { v4 as uuid } from 'uuid';

const TopProductsSlider = (props) => {
    return (
        <div className={stl.sectionContainer}>
            <div className={stl.topTextContainer}>
                <span className={stl.topText}>
                    <div><span>Топ </span>покупаемых товаров</div>
                    <p>выбери то, что ближе тебе</p>
                </span>
            </div>
            {props.popular && props.popular.length > 2
                ? TopSlider(props.popular)
                : TopCard(props.popular)
            }

        </div>
    )
}

const TopSlider = (popular) => {
    return (
        <>
            <CarouselWithButtons>
                {popular.map(item => {
                    return <Link key={item.id} href="/product/[id]" as={`/product/${item.id}`} >
                        <div className={stl.topItemContainer}>
                            <Avatar variant="square" className={stl.image} src={`${process.env.SERVER_UPLOAD_URL}/${item.image}`} alt="item" />
                            <span><p>{item.text}</p></span>
                        </div>
                    </Link>
                })}
            </CarouselWithButtons>
            <Link href="/products" ><button className={stl.btnBottom}>смотреть все товары</button></Link>
        </>
    )
}

const TopCard = (popular) => {
    return (
        <div className={classNames(stl.TopCardContainer, {[`${stl.TopCardItemOne}`]: popular.length === 1})}>
            {popular.map(item => {
                return <Link key={item.id} href="/product/[id]" as={`/product/${item.id}`} >
                    <div className={stl.topItemContainer}>
                        <Avatar variant="square" className={stl.image} src={`${process.env.SERVER_UPLOAD_URL}/${item.image}`} alt="item" />
                        <span><p>{item.text}</p></span>
                    </div>
                </Link>
            })}
            <Link href="/products" ><button className={stl.btnBottom}>смотреть все товары</button></Link>
        </div>
    )
}


export default TopProductsSlider
