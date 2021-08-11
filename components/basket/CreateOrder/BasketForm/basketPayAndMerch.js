import React from 'react';
import { Button, makeStyles, MenuItem, TextField } from '@material-ui/core';
import NPorUP from './NPorUP';
import s from '../../../../styles/orderForm.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { setPay, setPost } from '../../../../redux/reducers/form-reducer';
import { useToasts } from 'react-toast-notifications';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
    button: {
        display: 'flex',
        marginRight: 'auto',
        [theme.breakpoints.down('sm')]: {
            padding: '6px 10px',
            fontSize: '12px'
        },
    },
    actionsContainer: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            alignItems: 'center',
        },
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'center'
        }
    },
    buttonContainer: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            // flexDirection: 'column',
            alignItems: 'center',
            marginRight: 'auto',
        },
        '&.makeStyles-button-7': {
            fontSize: '9px'
        }
    },
}));

const currencies = [
    {
        value: 'Оплата на карту',
        label: 'Оплата на карту',
    },
    {
        value: 'Наложенный платёж',
        label: 'Наложенный платёж',
    },
    {
        value: 'Оплата наличными',
        label: 'Оплата наличными',
    },
];

const deliverys = [
    {
        value: 'Новой почтой',
        label: 'Новой почтой',
    },
    {
        value: 'Укр почтой',
        label: 'Укр почтой',
    },
    {
        value: 'Самовывоз',
        label: 'Самовывоз',
    }
];

const PayAndMarch = (props) => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const form = useSelector(state => state.answerForm)

    const [currency, setCurrency] = React.useState(form.pay);
    const [delivery, setDelivery] = React.useState(form.post);

    const handleChangePay = (event) => {
        setCurrency(event.target.value);
    };

    const handleChangeDelivery = (event) => {
        setDelivery(event.target.value)
    };

    React.useEffect(() => {
        let payment = currencies.find(item => item.value === currency ? item : null)
        dispatch(setPay(payment.label))
    }, [currency])

    React.useEffect(() => {
        let post = deliverys.find(item => item.value === delivery ? item : null)
        dispatch(setPost(post.label))
    }, [delivery])


    const { addToast, removeAllToasts } = useToasts()
    const { control, register, handleSubmit, errors } = useForm();

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

    let onSubmit = (values, e) => {
        console.log('answer form',values);
        window.addEventListener("unhandledrejection", chatchAllUnhandleErrors)
    }

    return (
        <div className={s.wrapper}>
            <form className={s.containerPayAmdMarch} onSubmit={handleSubmit(onSubmit)}>

                <TextField id="standard-select-currency"
                    select
                    label="Способ оплаты"
                    helperText="Пожалуйста, выбирите способ оплаты"
                    value={currency}
                    onChange={handleChangePay} >
            
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}

                </TextField>

                <TextField  id="standard-select-delivery"
                            select
                            label="Способ доставки"
                            helperText="Пожалуйста, выбирите способ доставки"
                            value={delivery}
                            onChange={handleChangeDelivery} >

                    {deliverys.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}

                </TextField>

                    
            </form>
            <div className={s.NPorUPWrapper}>
                {delivery === 'Новой почтой' || delivery === 'Укр почтой' || currency === 'Наложенный платёж'
                    ? <NPorUP register={register} control={control}/>
                    : null
                }
            </div>

            <div className={classes.actionsContainer}>
                <div className={classes.buttonContainer}>
                    <Button
                        disabled={props.activeStep === 0}
                        onClick={props.handleBack}
                        className={classes.button}
                    >
                        {'К первому шагу'}
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={()=>{props.handleCreate()}}
                        className={classes.button}
                    >
                        {'Оформить заказ'}
                    </Button>
        
                </div>
            </div>

        </div>
    )
}

export default PayAndMarch