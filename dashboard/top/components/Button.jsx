import { makeStyles } from '@material-ui/core';
import React from 'react'
import { Button } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    BtnSave: {
        fontSize: '14px',
        marginLeft: 5,
        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginTop: 5,
        },
    }
}));

const ButtonsList = (props) => {

    const classes = useStyles();

    if (props.top && props.top.length === 0) {
        return (<div></div>)
    }
    if(props.item.isNew) {
        return (<div></div>)
    }

    return (
        <div>
            <Button classes={classes.BtnSave} variant="contained" color="primary" onClick={()=>{props.updatePopular(props.item)}}>
                обновить
            </Button>
            <Button variant="contained" color="secondary" onClick={()=>{props.deletePopular(props.item)}}>
                удалить
            </Button>
        </div>
    )
}

export default ButtonsList