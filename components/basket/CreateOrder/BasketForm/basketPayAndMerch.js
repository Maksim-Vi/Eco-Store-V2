import React from 'react';
import { Button, MenuItem, TextField, Typography } from '@material-ui/core';
import s from '../../../../styles/orderForm.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { setPay, setPost, setPostInfo } from '../../../../redux/reducers/form-reducer';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { currencies, deliverys, validationSchema } from '../../../../utility/forms/utilsForms';
import { useStylesForm } from './styles';

const PayAndMarch = (props) => {

    const classes = useStylesForm();
    const dispatch = useDispatch()
    const form = useSelector(state => state.answerForm)

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(validationSchema) });

    const [currency, setCurrency] = React.useState(form.pay);
    const [delivery, setDelivery] = React.useState(form.post);
    const [postInfoPeople, setPostInfoPeople] = React.useState({
        post_FirstName: form.postInfo.post_FirstName,
        post_LastName: form.postInfo.post_LastName,
        post_Phone: form.postInfo.post_Phone,
        post_NumberPost: form.postInfo.post_NumberPost
    })

    const chengeHendler = (event) => {
        setPostInfoPeople({ ...postInfoPeople, [event.target.name]: event.target.value });
    };

    const handleChangePay = (event) => {
        setCurrency(event.target.value);
    };

    const handleChangeDelivery = (event) => {
        setDelivery(event.target.value)
    };

    let onSubmit = (value) => {
        props.handleCreate()
    }

    React.useEffect(() => {
        let payment = currencies.find(item => item.value === currency ? item : null)
        dispatch(setPay(payment.label))
    }, [currency])

    React.useEffect(() => {
        let post = deliverys.find(item => item.value === delivery ? item : null)
        dispatch(setPost(post.label))
    }, [delivery])

    React.useEffect(() => {
        dispatch(setPostInfo(postInfoPeople))
    }, [postInfoPeople])

    return (
        <form className={s.wrapper} onSubmit={handleSubmit(onSubmit)}>
            <div className={s.containerPayAmdMarch} >
                <TextField className={s.howPay}
                    id="standard-select-currency"
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

                <TextField className={s.howDelivery}
                    id="standard-select-delivery"
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
            </div>

            <div className={s.NPorUPWrapper}>
                {(delivery === 'Новой почтой' || delivery === 'Укр почтой') &&
                    <div className={s.NPorUPContainer}>
                        <div className={s.NameLastName}>
                            <div className={s.NameLastNameErr}>
                                <TextField
                                    label="Имя"
                                    name="post_FirstName"
                                    placeholder="Имя"
                                    id="post_FirstName"
                                    {...register('post_FirstName')}
                                    error={errors.post_FirstName ? true : false}
                                    className={s.textFieldName}
                                    inputProps={{ autocomplete: 'new-password', form: { autocomplete: 'off' } }}
                                    required
                                    margin="dense"
                                    onChange={chengeHendler}
                                    value={postInfoPeople.post_FirstName}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.post_FirstName?.message}
                                </Typography>
                            </div>
                            <div className={s.NameLastNameErr}>
                                <TextField
                                    label="Фамилия"
                                    name="post_LastName"
                                    placeholder="Фамилия"
                                    id="post_LastName"
                                    className={s.textFieldLastName}
                                    {...register('post_LastName')}
                                    error={errors.post_LastName ? true : false}
                                    inputProps={{ autocomplete: 'new-password', form: { autocomplete: 'off' } }}
                                    required
                                    margin="dense"
                                    onChange={chengeHendler}
                                    value={postInfoPeople.post_LastName}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.post_LastName?.message}
                                </Typography>
                            </div>
                        </div>
                        <div className={s.dataContainer}>
                            <TextField
                                id="post_Phone"
                                label="Телефон"
                                name="post_Phone"
                                placeholder="+380()ххх-ххх-ххх"
                                {...register('post_Phone')}
                                error={errors.post_Phone ? true : false}
                                inputProps={{ autocomplete: 'new-password', form: { autocomplete: 'off' } }}
                                required
                                fullWidth
                                margin="dense"
                                className={s.textField}
                                onChange={chengeHendler}
                                value={postInfoPeople.post_Phone}
                            />
                            <Typography variant="inherit" color="textSecondary">
                                {errors.post_Phone?.message}
                            </Typography>
                            <TextField
                                id="standard-full-width"
                                label="Город, Отделение"
                                name="post_NumberPost"
                                placeholder="Город, отделение почты"
                                required
                                fullWidth
                                {...register('post_NumberPost')}
                                error={errors.post_NumberPost ? true : false}
                                inputProps={{ autocomplete: 'new-password', form: { autocomplete: 'off' } }}
                                margin="dense"
                                className={s.textField}
                                onChange={chengeHendler}
                                value={postInfoPeople.post_NumberPost}
                            />
                            <Typography variant="inherit" color="textSecondary">
                                {errors.post_NumberPost?.message}
                            </Typography>
                        </div>
                    </div>
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
                        type="submit"
                        onClick={() => {delivery === 'Самовывоз' ? props.handleCreate() : console.log('req send data') }}
                        className={classes.button}
                    >
                        {'Оформить заказ'}
                    </Button>

                </div>
            </div>

        </form>
    )
}

export default PayAndMarch