import { makeStyles } from '@material-ui/core';
import React, { useContext } from 'react'
import { getCookie } from '../../../components/common/session';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { setTop } from '../../../redux/reducers/SRM/top/action';
import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import { AuchContext } from '../../../components/common/Context/context.hook';

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
    let router = useRouter()
    const auch = useContext(AuchContext)
    const { addToast, removeAllToasts } = useToasts()

    let message = (mes) => {
      removeAllToasts()
      addToast(mes, { appearance: 'success', autoDismiss: true })
    }
  
    let error = (mes) => {
      removeAllToasts()
      addToast(mes, { appearance: 'error', autoDismiss: true })
    }

    let updatePopular = async () => {
        let URL = process.env.SERVER_URL
        let cookie = getCookie('auth')

        let res = await axios.put(`${URL}/popular/${props.item.id}`, props.item, {
            headers: {
                'authorization': cookie,
                'Accept': 'application/json',
            },
        }).catch((err) => {
            console.log(`update popular ERROR Button`, err);
            error('Crit Error, Button При удалении топ что то пошло не так!')
            return
        })

        console.log(`ANSWR`, res);
        if (res.status === 200) {
            if(res.data && res.data.isAuch === false){
                error('Ошибка авторизации, истекла сессия токена')
                dispatch(setTop([]))
                return auch.logout(router)
            }
            message('Обновление топ товара прошло успешно! =)')
        } else {
            error('Что то пошло не так при обновлении! =(')
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
        }).catch((err) => {
            console.log(`delete once popular ERROR Button`, err);
            error('Crit Error, Button При удалении одного топа что то пошло не так!')
            return
        })

        if (res.status === 200) {
            if(res.data && res.data.isAuch === false){
                error('Ошибка авторизации, истекла сессия токена')
                dispatch(setTop([]))
                return auch.logout(router)
            }
            message('Удаление топ товара прошло успешно! =)')
            dispatch(setTop(res.data.tops))
            props.setTopArr(res.data.tops)
            props.setPopularItems(res.data.tops)
        } else {
            error('Что то пошло не так при удалении! =(')
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