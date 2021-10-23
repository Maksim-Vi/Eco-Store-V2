import { Box, Button, Grid, Typography } from '@material-ui/core'
import React from 'react'
import CardItem from './components/Card'
import s from '../../styles/reviews/reviews.module.scss'

const Reviews = () => {
   return (
      <Box className={s.reviewsWrapper}>
         <Box className={s.reviewsDescContainer}>
            <Typography variant="h3">Отзывы</Typography>
            <Typography variant="body1">На нашем сайте вы можете посмотреть отзывы о нас.</Typography>
            <br />
            <Typography variant="body1">Так же мы будем рады если вы оставите свое мнение о нас, а так же напишите отзыв в одной из соцсетей.</Typography>
            <Box className={s.reviewsButtom} component='div'>
               <Button variant="contained" color="primary">Оставить отзыв в Facebook</Button>
               <Button variant="contained" color="primary">Оставить отзыв в Google</Button>
            </Box>
         </Box>
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
      </Box>
   )
}

export default Reviews