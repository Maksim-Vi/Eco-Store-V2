import { Box, Grid } from '@material-ui/core'
import React from 'react'
import s from '../../styles/reviews/reviewsSrm.module.scss'
import ReviewsItem from './components/ReviewsItem'

const ReviewsContainer = (props) => {
    return (
        <Grid container direction="row" justifyContent="space-around" alignItems="center" className={s.reviewsWrapper}>
            {props.reviews &&
                props.reviews.map(item => {
                    return (
                        <Grid item xs={12} spacing={3} className={s.reviewsItem} key={item.id}>
                            <ReviewsItem id={item.id}
                                         userName={item.userName}
                                         reviewsText={item.reviewsText}
                                         reviewsCurrentUrl={item.reviewsCurrentUrl}
                                         isShowInMainPage={item.isShowInMainPage}
                                         isGoogle={item.isGoogle}
                                         openDialog={props.openDialog}
                                         openEditReviewsDialog={props.openEditReviewsDialog}
                                         deleteReview={props.deleteReview} />

                        </Grid>
                    )
                })

            }
        </Grid>
    )
}

export default ReviewsContainer
