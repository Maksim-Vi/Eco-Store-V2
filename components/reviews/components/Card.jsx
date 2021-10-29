import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Box, Button, CardActions, Divider } from '@material-ui/core';
import s from '../../../styles/reviews/reviews.module.scss'

const CardItem = (props) => {
    return (
        <Card key={props.key} className={s.CardItemContainer} variant="outlined">
            <CardContent>
                <Typography className={s.review} color="textSecondary">
                    {props.reviewsText}
                </Typography>
            </CardContent>
            <CardActions className={s.CardButton}>
                <Box className={s.CardButtonText} component='div'>
                    <Typography className={s.userName} variant="body1">{props.userName}</Typography>
                    <Divider />
                    <Typography className={s.placeReview} variant="body2">{!props.isGoogle ? 'отзыв с facebook' : 'отзыв с google'}</Typography>
                </Box>
                <Button variant="contained" color="primary" target='_blank' href={props.reviewsCurrentUrl}>Перейти к отзыву</Button>
            </CardActions>
        </Card>
    )
}

export default CardItem
