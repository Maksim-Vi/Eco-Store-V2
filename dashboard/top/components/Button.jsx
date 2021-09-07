import { makeStyles } from '@material-ui/core';
import React from 'react'
import { getCookie } from '../../../components/common/session';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { setTop } from '../../../redux/reducers/SRM/top/action';
import { useDispatch } from 'react-redux';

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
    const dispatch = useDispatch()

    let savePopular = async () => {
        let URL = process.env.SERVER_URL
        let cookie = getCookie('auth')

        let res = await axios.put(`${URL}/popular/${props.item.id}`, props.item ,  {
            headers: { 
                'authorization': cookie,
                'Accept': 'application/json', 
            },
        })

        if (res.status === 200) {
            console.log(`Popular added`);
        }
    }

    let updatePopular = async () => {
        let URL = process.env.SERVER_URL
        let cookie = getCookie('auth')

        let res = await axios.put(`${URL}/popular/${props.item.id}`, props.item, {
            headers: {
                'authorization': cookie,
                'Accept': 'application/json',
            },
        })

        console.log(`ANSWER`, res);

        if (res.status === 200) {
            console.log(`Popular update`);
        }
    }

    let deletePopular = async () => {
        let URL = process.env.SERVER_URL
        let cookie = getCookie('auth')

        let res = await axios.delete(`${URL}/popular/${props.item.id}`, props.item, {
            headers: {
                'authorization': cookie,
                'Accept': 'application/json',
            },
        })

        if (res.status === 200) {
            console.log(`Popular delete item`);
            dispatch(setTop(res.data.tops))
            props.setTopArr(res.data.tops)
            props.setPopularItems(res.data.tops)
        }
    }

    if (props.top.length === 0) {
        return (<div></div>)
    }
    if(props.item.isNew) {
        return (<div></div>)
    }

    return (
        <div>
            <Button classes={classes.BtnSave} variant="contained" color="primary" onClick={() => { updatePopular() }}>
                обновить
            </Button>
            <Button variant="contained" color="secondary" onClick={() => { deletePopular() }}>
                удалить
            </Button>
        </div>
    )
}

export default ButtonsList