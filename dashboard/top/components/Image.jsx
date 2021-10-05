import { Avatar, ListItemAvatar, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(() => ({
    Avatar: {
        maxWidth: '150px',
        maxHeight: '150px',
        width:'100%',
        height:'100%'
    },
}));
export default function Image({url}) {
    const classes = useStyles();
    return (
        <ListItemAvatar>
            <Avatar className={classes.Avatar} alt="Product" src={`${process.env.SERVER_UPLOAD_URL}/${url}`} variant="square" />
        </ListItemAvatar>
    )
}
