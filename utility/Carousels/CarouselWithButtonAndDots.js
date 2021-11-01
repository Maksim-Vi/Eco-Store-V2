import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CarouselWithButtonAndDots = ({ children, responsive, arrows, dotsOutside, dotListClass, itemClass }) => {
    return (
        <Carousel
            additionalTransfrom={0}
            arrows = {arrows}
            autoPlay={true}
            autoPlaySpeed={20000}
            centerMode={false}
            className=""
            containerClass="container"
            dotListClass={dotListClass}
            draggable
            focusOnSelect={false}
            infinite
            itemClass={itemClass}
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside={false}
            renderDotsOutside={dotsOutside}
            responsive={responsive}
            showDots
            sliderClass=""
            slidesToSlide={1}
            swipeable
        >
            {children}
        </Carousel>
    )
}

export default CarouselWithButtonAndDots