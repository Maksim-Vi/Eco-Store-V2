import { Grid } from '@material-ui/core'
import React from 'react'
import CardItem from './components/Card'
import s from '../../styles/reviews/reviews.module.scss'

const Reviews = () => {
    return (
        <Grid container className={s.reviewsContainer}>
             <Grid className={s.reviewsItem} item xs={6}>
                <CardItem />
             </Grid>
             <Grid className={s.reviewsItem} item xs={6}>
                <CardItem />
             </Grid>
             <Grid className={s.reviewsItem} item xs={6}>
                <CardItem />
             </Grid>
             <Grid className={s.reviewsItem} item xs={6}>
                <CardItem />
             </Grid>
        </Grid>
    )
}

export default Reviews