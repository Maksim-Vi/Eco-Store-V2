import { Button, makeStyles, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useToasts } from 'react-toast-notifications'
import { setEmail, setName, setPhone } from '../../../../redux/reducers/form-reducer'
import s from '../../../../styles/basketForm.module.scss'

const useStyles = makeStyles((theme) => ({
    button: {
      display: 'flex',
      width:'50%',
      marginBottom: 30,
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        padding:'6px 50px',
        fontSize: '12px',
      },
    },
  }));

const BasketForm = (props) => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const form = useSelector(state => state.answerForm)

    let [formLocalData, setFormLocalData] = useState({
        name: form.firstName,
        phone: form.phone,
        email: form.Email
    })

    let setDataForm = (e) => {
        setFormLocalData({ ...formLocalData, [e.target.name]: e.target.value })
    }

    const { addToast, removeAllToasts } = useToasts()
    const { register, handleSubmit, errors } = useForm();

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

    let onSubmit = (values,e) => {
        dispatch(setName( values.name))
        dispatch(setPhone( values.phone))
        dispatch(setEmail( values.email))
        window.addEventListener("unhandledrejection", chatchAllUnhandleErrors)
        props.handleNext()
    }

    React.useEffect(() => {
        let message = ''

        if(Object.keys(errors).length !== 0){
            let title = 'Ваша форма не была отправлена! '
            message += title
            if(errors.name){
                let text1 = errors.name?.type === 'maxLength' || 'minLength'
                    ? '1) Имя не должно быть больше 20 символов, но больше 1 ' 
                    : '1) Вы не ввели имя '
                message += text1 
            }
            if(errors.phone){
                let text2 = errors.phone?.type === 'pattern'  
                    ? "2) телефон введен не правильно, проверьте свои данные!" 
                    : errors.phone?.message
                message += text2
            }
            if(errors.email){
                let text3 = errors.email?.type === 'pattern' 
                    ? '3) не верный email ' 
                    : ''
                message += text3
            }
            if(message !== '')
                error(message)
        }
    }, [errors])

    return (
        <form className={s.FormContainer} onSubmit={handleSubmit(onSubmit)} autoComplete="off">

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
            <TextField className={s.containerInput} 
                        id="standard-basic" 
                        label="* Введите Ваше имя" 
                        name="name" id="name"
                        placeholder="Введите Ваше имя"
                        ref={register({ required: true, minLength:1, maxLength: 20 })}
                        value={formLocalData.name}
                        onChange={(e) => { setDataForm(e) }}
            />

            <TextField  className={s.containerInput} 
                        id="standard-basic" 
                        label="* +38(0xx)xxx-xx-xx" 
                        name="phone" id="phone"
                        placeholder="+38(0xx)xxx-xx-xx"
                        ref={register({required: "2) вы не ввели телефон", pattern: /^[\+]?\d{2,}?[-\s\.]?[(]?\d{2,}[)]?[-\s\.]?\d{2,}?[-\s\.]?\d{2,}[-\s\.]?\d{0,9}$/im})} 
                        value={formLocalData.phone}
                        onChange={(e) => { setDataForm(e) }}
            />
            
            <TextField className={s.containerInput} 
                        id="standard-basic" 
                        label="Введите Ваш email"
                        name="email" id="email"
                        placeholder="Введите Ваш email"
                        ref={register({required: false, pattern: /^\S+@\S+$/i})}
                        value={formLocalData.email}
                        onChange={(e) => { setDataForm(e) }} 
            />

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

//pattern: /^[\+]?\d{2,}?[(]?\d{2,}[)]?\d{2,}?[-\s\.]?\d{2,}[-\s\.]?\d{0,9}$/im