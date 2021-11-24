import React from 'react';
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
import { useForm } from 'react-hook-form';

const useStyles = makeStyles({
    root: {
        '& .MuiDialog-paperWidthSm': {
            width: '100%',
            maxWidth: '800px'
        },
        '& .MuiDialog-paper':{
            margin: 5
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

const PopupContactUs = ({ open, handleClose, ...props }) => {

    const classes = useStyles();

    const { addToast, removeAllToasts } = useToasts()
    const { register, trigger, handleSubmit, formState: { errors } } = useForm();

    let message = (mes) => {
        removeAllToasts()
        addToast(mes, { appearance: 'success', autoDismiss: true })

    }
    let error = (mes) => {
        removeAllToasts()
        addToast(mes, { appearance: 'error', autoDismiss: true })
    }

    let onSubmit = async (values, e) => {
        let data = await props.postFormStore(values.username, values.email, values.subject)
        
        if(data && (data.status === 200 || data.status === 201) && data.err === false){
            message('Данные были переданы. Ожидайте, с вами свяжется менеджер')
        } else if(data.status !== 200 && data.err === true){
            error(data ? data.text : 'Что то пошло не так, попробуйте снова!')
        } else {
            error('Прооблема с подключением к базе данных, обратитесь к менеджеру')
        }
       
        e.target.reset();
        handleClose(true)
    }

    React.useEffect(() => {
        let message = ''

        if(Object.keys(errors).length !== 0){
            let title = 'Ваша фарма не была отправлена! '
            message += title
            let text1 = errors.username?.type === 'maxLength' && '1) Имя не должно быть больше 20 символов ' 
            let text2 = errors.email?.type === 'pattern' && '2) не верный email '
            let text3 = errors.subject?.message && "3) Поле не может быть пустым или содержать больше 200 символов. "
    
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
                    <span className={classes.ItemClose} onClick={() => { handleClose(false) }}>&times;</span>
                </DialogTitle>
                <DialogContent className={`${s.containerContactUsForm}`}>
                    <form className={`${s.formControl}`} onSubmit={handleSubmit(onSubmit)}>

                        <div className={s.containerInput} style={{ marginRight: 'auto' }}>
                            <input type="contactUS"
                                className={s.txtInput}
                                name="username"
                                id="username"
                                placeholder="Введите ваше Имя"
                                required
                                {...register("username", { required: true, minLength: 1, maxLength: 20 })}
                            />
                            {errors.username && <span className={s.error}>проверьте поле с именем!</span>}
                        </div>

                        <div className={s.containerInput} style={{ marginRight: 'auto' }}>
                            <input type="contactUS"
                                className={s.txtInput}
                                name="email"
                                id="contacts"
                                placeholder="Введите ваш email"
                                required
                                {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
                            />
                            {errors.email && <span className={s.error}>проверьте поле с email!</span>}
                        </div>

                        <div className={s.containerInput}>
                            <textarea type="contactUS"
                                name="subject"
                                className={s.txtArea}
                                placeholder="Задайте нам вопрос"
                                required
                                {...register("subject", { required: true, maxLength: 200 })}
                            />
                            {errors.subject && <span className={s.error}>проверьте поле, оно должно быть не больше 200 символов.</span>}
                        </div>

                        <button className={s.btnContuctUS} type="submit" >Отправить</button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default compose(connect(null, { postFormStore }))(PopupContactUs)