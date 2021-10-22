import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsiveLinksItem } from './utils';

const CarouselLinks = ({ children,className,itemClass }) => {
    return (
        <Carousel
            containerClass={className}
            itemClass={itemClass}
            additionalTransfrom={0}
            centerMode={false}
            draggable={true}
            focusOnSelect={false}
            infinite={false}
            minimumTouchDrag={10}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={responsiveLinksItem()}
            showDots={false}
            customTransition="all .1"
            removeArrowOnDeviceType={["desktop","tablet", "mobile"]}
            slidesToSlide={1}
            swipeable
        >
            {children}
        </Carousel>
    )
}

export default CarouselLinks
