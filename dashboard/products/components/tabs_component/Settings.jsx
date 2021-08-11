import React from 'react'
import { Grid, makeStyles, Tooltip, Typography, TextField, Divider, CardContent, Card } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    CardWrapper: {
        margin: '20px',
        marginLeft: '250px',
        marginRight: '250px',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '5px',
            marginRight: '5px',
        },
    },
}));


export const Settings = () => {
    const classes = useStyles();
    return (
        <Card className={classes.CardWrapper}>
            <CardContent className={classes.Container}>

            </CardContent>
        </Card>
    )
}

export default Settings
