import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardActions } from '@material-ui/core';
import s from '../../../styles/reviews/reviews.module.scss'

const CardItem = () => {
    return (
        <Card className={s.CardItemContainer} variant="outlined">
            <CardContent>
                <Typography color="textSecondary">
                    Word of the Day
                </Typography>
            </CardContent>
            <CardActions>

            </CardActions>
        </Card>
    )
}

export default CardItem
