import { Button, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '30%',
        marginLeft: 'auto',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            fontSize: '9px',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '9px',
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
