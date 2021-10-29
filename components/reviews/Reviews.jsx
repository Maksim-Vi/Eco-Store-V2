import { Box, Button, Grid, Typography } from '@material-ui/core'
import React from 'react'
import CardItem from './components/Card'
import s from '../../styles/reviews/reviews.module.scss'

const Reviews = (props) => {

   if (!props.reviews && props.reviews.length === 0) return

   return (
      <Box className={s.reviewsWrapper}>
         <Box className={s.reviewsDescContainer}>
            <Typography variant="h3">Отзывы</Typography>
            <Typography variant="body1">На нашем сайте вы можете посмотреть отзывы о нас.</Typography>
            <br />
            <Typography variant="body1">Так же мы будем рады если вы оставите свое мнение о нас, а так же напишите отзыв в одной из соцсетей.</Typography>
            <Box className={s.reviewsButtom} component='div'>
               <Button variant="contained" color="primary" target='_blank' href='https://www.facebook.com/ecochoice.com.ua/reviews'>Оставить отзыв в Facebook</Button>
               <Button variant="contained" color="primary" target='_blank' href='https://www.google.com/maps/place/Eco+Choice+-+%D0%AD%D0%BA%D0%BE+%D0%BF%D0%BE%D0%B4%D0%B0%D1%80%D0%BA%D0%B8+%D0%B8+%D1%82%D0%BE%D0%B2%D0%B0%D1%80%D1%8B+%D0%B4%D0%BB%D1%8F+%D0%B4%D0%BE%D0%BC%D0%B0+(%D0%98%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82-%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD)/@50.4253051,30.6000508,17z/data=!3m1!4b1!4m5!3m4!1s0x40d4c5071128ef33:0xa2cc72d01ed0d8cb!8m2!3d50.425314!4d30.602306'>Оставить отзыв в Google</Button>
            </Box>
         </Box>
         <Grid container className={s.reviewsContainer} spacing={2}>
            {props.reviews &&
               props.reviews.map(review => {
                  return <Grid className={s.reviewsItem} item lg={6} sm={12} >
                     <CardItem key={review.id} userName={review.userName} reviewsText={review.reviewsText} reviewsCurrentUrl={review.reviewsCurrentUrl} isGoogle={review.isGoogle} />
                  </Grid>
               })
            }
         </Grid>
      </Box>
   )
}

export default Reviews