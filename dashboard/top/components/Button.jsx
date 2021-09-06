import { makeStyles } from '@material-ui/core';
import React from 'react'
import { getCookie } from '../../../components/common/session';
import { Button } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    BtnSave:{
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
    
    let savePopular = async () =>{
        let URL = process.env.SERVER_URL
        let cookie = getCookie('auth')
        
        let res = await axios.post(`${URL}/popular/${props.item.id}`, props.item ,  {
            headers: { 
                'authorization': cookie,
                'Accept': 'application/json', 
            },
        })

        if(res.status === 200){
            console.log(`Popular added`);
        } 
    }

    let updatePopular = async () =>{
        let URL = process.env.SERVER_URL
        let cookie = getCookie('auth')
        
        let res = await axios.put(`${URL}/popular/${item.id}`, props.item ,  {
            headers: { 
                'authorization': cookie,
                'Accept': 'application/json', 
            },
        })

        if(res.status === 200){
            console.log(`Popular update`);
        } 
    }

    if(props.top.length === 0){
        return null
    }

    return (
        <>
            {props.item.isNew 
                ? <Button classes={classes.BtnSave} variant="contained" color="primary" onClick={()=>{savePopular()}}>
                    сохранить 
                </Button> 
                : <Button classes={classes.BtnSave} variant="contained" color="primary" onClick={()=>{updatePopular()}}>
                    обновить 
                </Button> 
            }
        </>
    )
}

export default ButtonsList