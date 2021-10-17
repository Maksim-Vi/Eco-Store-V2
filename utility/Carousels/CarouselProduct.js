import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import s from "../../styles/sliderStyles/productSlider.module.scss"
import { CustomDot } from './CustomDot';
import { responsiveOneItem } from './utils'

const CarouselProduct = ({ children, images }) => {
    return (
        <Carousel
            responsive={responsiveOneItem()}
            additionalTransfrom={0}
            arrows
            // autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container"
            dotListClass={s.SliderProductCustomDots}
            draggable={false}
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside={false}
            renderDotsOutside
            customDot={<CustomDot images={images}/>}
            showDots
            sliderClass=""
            slidesToSlide={1}
            swipeable={false}
        >
            {children}
        </Carousel>
    )
}

export default CarouselProduct