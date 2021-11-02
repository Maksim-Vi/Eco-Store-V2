import { Avatar } from '@material-ui/core'
import React from 'react'
import stl from '../../styles/sliderStyles/topProductsSlider.module.scss'
import CarouselWithButtons from '../../utility/Carousels/CarouselWithButtons';
import Link from "next/link";

const TopProductsSlider = (props) => {
    return (
        <div className={stl.sectionContainer}>
                <div className={stl.topTextContainer}>
                    <span className={stl.topText}>
                        <div><span>Топ </span>покупаемых товаров</div>
                        <p>выбери то, что ближе тебе</p>
                    </span>
                </div>
                <CarouselWithButtons>
                    {props.popular.map(item => {
                        return  <Link href="/product/[id]" as={`/product/${item.id}`} >
                            <div className={stl.topItemContainer}>
                                <Avatar variant="square" className={stl.image} src={`${process.env.SERVER_UPLOAD_URL}/${item.image}`} alt="item" />
                                <span><p>{item.text}</p></span>
                            </div>
                    </Link>
                    })}
                </CarouselWithButtons>
                <Link href="/products" ><button className={stl.btnBottom}>смотреть все товары</button></Link>
            </div>
            )
}

            export default TopProductsSlider
