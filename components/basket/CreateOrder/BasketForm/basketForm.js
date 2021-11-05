import { Button, makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { setEmail, setName, setPhone } from '../../../../redux/reducers/form-reducer'
import s from '../../../../styles/basketForm.module.scss'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchemaBasket } from '../../../../utility/forms/utilsForms'

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
        setFormLocalData({ ...formLocalData, [e.target.name]: e.target.value })
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(validationSchemaBasket) });

    let onSubmit = (values) => {
        setFormLocalData({username: values.username, phone: values.phone, email: values.email})
        dispatch(setName(values.username))
        dispatch(setPhone(values.phone))
        dispatch(setEmail(values.email))
        props.handleNext()
    }

    React.useEffect(() => {
        if(form.firstName !== '' || form.phone || form.Email !== ''){
            setFormLocalData({
                username: form.firstName, phone: form.phone, email: form.Email
            })
        }
    },[form.firstName, form.phone, form.Email])
    return (
        <form className={s.FormContainer} onSubmit={handleSubmit(onSubmit)}>
            <TextField className={s.containerInput}
                label="Введите Ваше имя"
                name="username"
                id="username"
                placeholder="Введите Ваше имя"
                required
                inputProps={{ form: { autocomplete: 'off' } }}
                {...register('username')}
                error={errors.username ? true : false}
                value={formLocalData.username}
                onChange={(e)=>{setDataForm(e)}}
            />
            <Typography variant="inherit" color="textSecondary">
                {errors.username?.message}
            </Typography>

            <TextField className={s.containerInput}
                label="+38(0xx)xxx-xx-xx"
                name="phone" 
                id="phone"
                placeholder="+38(0xx)xxx-xx-xx"
                inputProps={{ form: { autocomplete: 'off' } }}
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
                label="Введите Ваш email"
                name="email" 
                id="email"
                placeholder="Введите Ваш email"
                {...register('email')}
                inputProps={{
                    form: {
                      autocomplete: 'off',
                    },
                }}
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