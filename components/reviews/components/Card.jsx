import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button, CardActions } from '@material-ui/core';
import s from '../../../styles/reviews/reviews.module.scss'

const CardItem = () => {
    return (
        <Card className={s.CardItemContainer} variant="outlined">
            <CardContent>
                <Typography color="textSecondary">
                   text
                </Typography>
            </CardContent>
            <CardActions>
                <Typography variant="body1">Name</Typography>
                <Button variant="contained" color="primary">Primary</Button>
            </CardActions>
        </Card>
    )
}

export default CardItem
