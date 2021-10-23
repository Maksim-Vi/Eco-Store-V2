import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Box, Button, CardActions, Divider } from '@material-ui/core';
import s from '../../../styles/reviews/reviews.module.scss'

const CardItem = () => {
    return (
        <Card className={s.CardItemContainer} variant="outlined">
            <CardContent>
                <Typography className={s.review} color="textSecondary">
                    Заказала на пробу себе наборчик деревянных столовых приборов, трубочки и зубные щетки. 
                    Невероятно крутой весь товар! Качество на высоте,  отправка и доставка быстрая. 
                    Обязательно в скором времени закажу и другим членам семьи такие столовые приборы.
                </Typography>
            </CardContent>
            <CardActions className={s.CardButton}>
                <Box className={s.CardButtonText} component='div'>
                    <Typography className={s.userName} variant="body1">Traveller</Typography>
                    <Divider />
                    <Typography className={s.placeReview} variant="body2">{true ? 'отзыв с facebook' : 'отзыв с google'}</Typography>
                </Box>
                <Button variant="contained" color="primary">Перейти к отзыву</Button>
            </CardActions>
        </Card>
    )
}

export default CardItem
