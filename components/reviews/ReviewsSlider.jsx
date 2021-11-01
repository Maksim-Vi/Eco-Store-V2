import { Box } from '@material-ui/core'
import React from 'react'
import s from '../../styles/reviews/reviews.module.scss'
import CarouselWithButtonAndDots from '../../utility/Carousels/CarouselWithButtonAndDots'
import { responsiveTwoItems } from '../../utility/Carousels/utils'
import CardItem from './components/Card'

const ReviewsSlider = (props) => {

    if(!props.reviews && props.reviews.length === 0) return 
    
    return (
        <Box className={s.sliderReviewsContainer} component="div">
            <div className={s.topTextContainer}>
                <span className={s.topText}>
                    <div>Отзывы <span>о нас </span></div>
                </span>
            </div>
            <CarouselWithButtonAndDots responsive={responsiveTwoItems()} dotsOutside={true} dotListClass={s.sliderDots} arrows={false} itemClass={s.itemClass}>
                {props.reviews && props.reviews.length > 0 &&
                    props.reviews.map(review=>{
                        if(!review.isShowInMainPage) return 
                        return <CardItem key={review.id} userName={review.userName} reviewsText={review.reviewsText} reviewsCurrentUrl={review.reviewsCurrentUrl} isGoogle={review.isGoogle}/>
                    })
                }
            </CarouselWithButtonAndDots>
        </Box>
    )
}

export default ReviewsSlider