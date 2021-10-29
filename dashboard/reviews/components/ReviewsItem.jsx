import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@material-ui/core'
import React from 'react'
import s from '../../../styles/reviews/reviewsSrm.module.scss'

export default function ReviewsItem(props) {

    let editReviers = () => {
        let data = {
            id: props.id,
            userName: props.userName,
            reviewsText: props.reviewsText,
            reviewsCurrentUrl: props.reviewsCurrentUrl,
            isGoogle: props.isGoogle,
            isShowInMainPage: props.isShowInMainPage
        }
        props.openEditReviewsDialog(data)
    }

        return (
            <Card className={s.CardItemContainer} variant="outlined">
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
                    <Box className={s.btnContainer} component='div'>
                        <Button className={s.delete} variant="contained" color="primary" onClick={() => { props.deleteReview(props.id) }} >Удалить отзыв</Button>
                        <Button className={s.edit} variant="contained" color="primary" onClick={() => { editReviers() }} >Редактировать</Button>
                        <Button variant="contained" color="primary" target='_blank' href={props.reviewsCurrentUrl}>Перейти к отзыву</Button>
                    </Box>
                </CardActions>
            </Card>
        )
    }
