import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useToasts } from 'react-toast-notifications'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import s from '../../../../styles/content/contactPopup.module.scss'
import { makeStyles } from '@material-ui/core/styles'
import { postFormStore } from '../../../../redux/reducers/form-reducer';
import { AuchContext } from '../../../common/Context/context.hook';
import { useForm } from 'react-hook-form';
import * as gtag from '../../../../lib/gtag'

const useStyles = makeStyles({
    root: {
        '& .MuiDialog-paperWidthSm': {
            width:'100%',
            maxWidth:'800px'
        }
    },
    ItemClose: {
        position: 'absolute',
        marginRight: '1%',
        marginTop: '-15px',
        fontSize: '32px',
        cursor: 'pointer',
        right: '0',
        color: 'gray',
        '&:hover': {
            color: 'red'
        }
    }
});

  
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const PopupContactUs = ({ open, handleClose , ...props}) => {

    const classes = useStyles();

    let auch = useContext(AuchContext)
    let token = auch.token

    const { addToast, removeAllToasts } = useToasts()
    const { register, trigger, handleSubmit, errors } = useForm();

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
        props.postFormStore(token, values.name, values.email, values.subject)
        message('Данные были переданы. Ожидайте, с вами свяжется менеджер')
        window.addEventListener("unhandledrejection", chatchAllUnhandleErrors)
        gtag.event({
            action: 'submit_form',
            category: 'Popup ContactUs',
            label: values.name,
        })
        e.target.reset();
        handleClose(true)
    }

    React.useEffect(() => {
        let message = ''

        if(Object.keys(errors).length !== 0){
            let title = 'Ваша фарма не была отправлена! '
            message += title
            let text1 = errors.email?.type === 'maxLength' || 'minLength'
                ? '1) Имя не должно быть больше 20 символов, но больше 1 ' 
                : '1) Вы не ввели имя ' 
            let text2 = errors.email?.type === 'pattern' ? '2) не верный email ' : errors.email?.message
            let text3 = errors.subject?.message
    
            if(text1)
                message += text1
            if(text2)
                message += text2
            if(text3)
                message += text3
            if(message !== '')
                error(message)
        }
    }, [errors])
    
    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                className={classes.root}
            >
                <DialogTitle id="alert-dialog-slide-title">
                    Связаться с нами
                    <span className={classes.ItemClose} onClick={()=>{handleClose(false)}}>&times;</span>
                </DialogTitle>
                <DialogContent className={`${s.containerContactUsForm}`}>
                    <form className={`${s.formControl}`} onSubmit={handleSubmit(onSubmit)}>

                        <div className={s.containerInput} style={{ marginRight: 'auto' }}>
                            <input type="contactUS"
                                   className={s.txtInput} 
                                   name="name" 
                                   id="name" 
                                   placeholder="Введите ваше Имя" 
                                   ref={register({ required: true, minLength:1, maxLength: 20 })}/>
                        </div>

                        <div className={s.containerInput} style={{ marginRight: 'auto' }}>
                            <input type="contactUS" 
                                   className={s.txtInput} 
                                   name="email" 
                                   id="contacts" 
                                   placeholder="Введите ваш email" 
                                   ref={register({required: "2) Введите email ", pattern: /^\S+@\S+$/i})}/>
                        </div>

                        <div className={s.containerInput}>
                            <textarea type="contactUS" 
                                      name="subject" 
                                      className={s.txtArea}
                                      placeholder="Задайте нам вопрос" 
                                      ref={register({required: "3) Поле не может быть пустым или содержать больше 200 символов. ", maxLength: 200})}/>
                        </div>

                        <button className={s.btnContuctUS} type="submit" >Отправить</button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default compose(connect(null, { postFormStore }))(PopupContactUs)