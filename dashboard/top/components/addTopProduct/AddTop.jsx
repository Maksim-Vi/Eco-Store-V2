import { Button, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '30%',
        marginLeft: 'auto',
        fontSize: '14px',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
   
}));


export default function AddTop(props) {
    const classes = useStyles();
    return (
        <Button className={classes.root} color="primary" variant="contained" onClick={()=>{props.toggleDrawer(true)}}>
          Добавить Популярный товар 
        </Button>
    )
}
