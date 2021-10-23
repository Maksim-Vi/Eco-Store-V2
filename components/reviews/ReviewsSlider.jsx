import { Box } from '@material-ui/core'
import React from 'react'
import s from '../../styles/reviews/reviews.module.scss'
import CarouselWithButtonAndDots from '../../utility/Carousels/CarouselWithButtonAndDots'
import { responsiveTwoItems } from '../../utility/Carousels/utils'
import CardItem from './components/Card'

const ReviewsSlider = () => {
    return (
        <Box className={s.sliderReviewsContainer} component="div">
            <div className={s.topTextContainer}>
                <span className={s.topText}>
                    <div>Отзывы <span>о нас </span></div>
                </span>
            </div>
            <CarouselWithButtonAndDots responsive={responsiveTwoItems()} dotsOutside={true} dotListClass={s.sliderDots} arrows={false} itemClass={s.itemClass}>
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
            </CarouselWithButtonAndDots>
        </Box>
    )
}

export default ReviewsSlider