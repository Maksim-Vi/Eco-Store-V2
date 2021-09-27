import { Button, Checkbox, makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useToasts } from 'react-toast-notifications'
import { setEmail, setName, setPhone } from '../../../../redux/reducers/form-reducer'
import s from '../../../../styles/basketForm.module.scss'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const useStyles = makeStyles((theme) => ({
    button: {
        display: 'flex',
        width: '50%',
        marginBottom: 30,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            padding: '6px 50px',
            fontSize: '12px',
        },
    },
}));

const phoneRegExp = /^[\+]?\d{2,}?[-\s\.]?[(]?\d{2,}[)]?[-\s\.]?\d{2,}?[-\s\.]?\d{2,}[-\s\.]?\d{0,9}$/im

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Поле не заполнено')
        .min(3, 'Имя не должно быть меньше 3 символов')
        .max(20, 'Имя не должно быть больше 20 символов'),
    email: Yup.string().email('не верный email '),
    phone: Yup.string()
        .required('Поле не заполнено')
        .matches(phoneRegExp, "Телефон введен не правильно, проверьте свои данные!")
});

const BasketForm = (props) => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const form = useSelector(state => state.answerForm)

    let [formLocalData, setFormLocalData] = useState({
        username: form.firstName,
        phone: form.phone,
        email: form.Email
    })

    let setDataForm = (e) => {
        console.log(`ANSWER`,e.target.value);
        setFormLocalData({ ...formLocalData, [e.target.name]: e.target.value })
    }

    const { addToast, removeAllToasts } = useToasts()
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(validationSchema) });

    let message = (mes) => {
        removeAllToasts()
        addToast(mes, { appearance: 'success', autoDismiss: true })
    }
    let error = (mes) => {
        removeAllToasts()
        addToast(mes, { appearance: 'error', autoDismiss: true })
    }
    let chatchAllUnhandleErrors = (reason, promise) => {
        error('Что то пошло не так, попробуйте снова!')
    }

    let onSubmit = (values) => {
        console.log(`ANSWER`, values);
        setFormLocalData({username: values.username, phone: values.phone, email: values.email})
        dispatch(setName(values.username))
        dispatch(setPhone(values.phone))
        dispatch(setEmail(values.email))
        window.addEventListener("unhandledrejection", chatchAllUnhandleErrors)
        props.handleNext()
    }

    React.useEffect(() => {
        let message = ''
        if (Object.keys(errors).length !== 0) {
            let title = 'Ваша форма не была отправлена! '
            message += title
            if (errors.username) {
                let text1 = errors.username?.type === 'max' || 'min'
                    ? '1) Имя не должно быть больше 20 символов, но больше 1 '
                    : '1) Вы не ввели имя '
                message += text1
            }
            if (errors.phone) {
                let text2 = errors.phone?.type === 'matches'
                    ? "2) телефон введен не правильно, проверьте свои данные!"
                    : errors.phone?.message
                message += text2
            }
            if (errors.email) {
                let text3 = errors.email?.type === 'email'
                    ? '3) не верный email '
                    : ''
                message += text3
            }
            if (message !== '')
                error(message)
        }
    }, [errors])

    React.useEffect(() => {
        if(form.firstName !== '' || form.phone || form.Email !== ''){
            setFormLocalData({
                username: form.firstName, phone: form.phone, email: form.Email
            })
        }
    },[])

    return (
        <form className={s.FormContainer} onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <TextField className={s.containerInput}
                error
                id="standard-basic"
                label="Введите Ваше имя"
                name="username" id="username"
                placeholder="Введите Ваше имя"
                required
                {...register('username')}
                error={errors.username ? true : false}
                value={formLocalData.username}
                onChange={(e)=>{setDataForm(e)}}
            />
            <Typography variant="inherit" color="textSecondary">
                {errors.username?.message}
            </Typography>

            <TextField className={s.containerInput}
                id="standard-basic"
                label="+38(0xx)xxx-xx-xx"
                name="phone" id="phone"
                placeholder="+38(0xx)xxx-xx-xx"
                required
                {...register('phone')}
                error={errors.phone ? true : false}
                value={formLocalData.phone}
                onChange={(e)=>{setDataForm(e)}}
            />
            <Typography variant="inherit" color="textSecondary">
                {errors.phone?.message}
            </Typography>

            <TextField className={s.containerInput}
                id="standard-basic"
                label="Введите Ваш email"
                name="email" id="email"
                placeholder="Введите Ваш email"
                {...register('email')}
                error={errors.email ? true : false}
                value={formLocalData.email}
                onChange={(e)=>{setDataForm(e)}}
            />
            <Typography variant="inherit" color="textSecondary">
                {errors.email?.message}
            </Typography>

            <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
            >
                {'Далее'}
            </Button>

        </form>
    )
}


export default BasketForm



{/* <div className={s.containerInput} style={{ marginRight: 'auto' }}>
                <input type="contactUS"
                    className={s.txtInput}
                    name="name" id="name"
                    placeholder="Введите ваше Имя"
                    ref={register({ required: true, minLength:1, maxLength: 20 })}
                    value={formLocalData.name}
                    onChange={(e) => { setDataForm(e) }} />

            </div>

            <div className={s.containerInput} style={{ marginRight: 'auto' }}>
                <input type="contactUS"
                    className={s.txtInput}
                    name="phone" id="phone"
                    placeholder="+38(0xx)xxx-xx-xx"
                    
                    ref={register({required: "2) вы не ввели телефон", pattern: /^[\+]?\d{2,}?[-\s\.]?[(]?\d{2,}[)]?[-\s\.]?\d{2,}?[-\s\.]?\d{2,}[-\s\.]?\d{0,9}$/im})} 
                    value={formLocalData.phone}
                    onChange={(e) => { setDataForm(e) }} />
            </div>

            <div className={s.containerInput} style={{ marginRight: 'auto' }}>
                <input type="contactUS"
                    className={s.txtInput}
                    name="email" id="email"
                    placeholder="Введите ваш email"
                    ref={register({required: false, pattern: /^\S+@\S+$/i})}
                    value={formLocalData.email}
                    onChange={(e) => { setDataForm(e) }} />
            </div>  */}