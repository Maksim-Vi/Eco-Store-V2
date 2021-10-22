import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useToasts } from 'react-toast-notifications'
import stl2 from '../../styles/content/contactUs.module.scss'
import { postFormStore } from '../../redux/reducers/form-reducer';
import { AuchContext } from '../common/Context/context.hook';
import { useForm } from 'react-hook-form';
import * as gtag from '../../lib/gtag'
import ABS from '../common/abs';

const ContactUs = (props) => {

    let auch = useContext(AuchContext)
    let token = auch.token

    const { addToast, removeAllToasts } = useToasts()
    const { register, handleSubmit, formState: { errors } } = useForm();

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
        props.postFormStore(token, values.name, values.email, values.subject)
        message('Данные были переданы. Ожидайте, с вами свяжется менеджер')
        //window.addEventListener("unhandledrejection", chatchAllUnhandleErrors)

        if (process.env.NODE_ENV === 'production') {
            gtag.event({
                action: 'submit_form',
                category: 'ContactUs',
                label: values.name,
            })
            e.target.reset();
        }
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
        <section className={stl2.sectionContactUsContainer}>
            <div className={stl2.topTextContactUsContainer}>
                <span className={`${stl2.topTextContacUs}`}>
                    <div>Напиши<span> Нам</span></div>
                    <p style={{ marginLeft: 0 }}>Если у вас возникли вопросы вы всегда можете к нам обратиться.</p>
                    <p style={{ marginLeft: 0 }}>Расскажем поможем в выборе товара!</p>
                </span>
            </div>
            <div className={stl2.containerContactUsForm}>
                <form className={`${stl2.formControl}`} onSubmit={handleSubmit(onSubmit)}>

                    <div className={stl2.containerInput} style={{ marginRight: 'auto' }}>
                        <input type="contactUS" 
                               className={stl2.txtInput} 
                               name="name" id="name" 
                               placeholder="Введите ваше Имя" 
                               {...register("username", { required: true, minLength:1, maxLength: 20 })}
                            // {...register("username", { required: true})}
                        />
                    </div>

                    <div className={stl2.containerInput} style={{ marginRight: 'auto' }}>
                        <input type="contactUS"
                            className={stl2.txtInput}
                            name="email" id="contacts"
                            placeholder="Введите ваш email или телефон"
                            //{...register("email",{required: "2) Введите email ", pattern: /^\S+@\S+$/i})}
                            {...register("email")}
                        />
                    </div>

                    <div className={stl2.containerInput}>
                        <textarea type="contactUS"
                            className={stl2.txtArea}
                            name="subject"
                            placeholder="Задайте нам вопрос"
                            {...register("subject", {required: "3) Поле не может быть пустым или содержать больше 200 символов. ", maxLength: 200})}
                        //{...register("subject", { required: true})}
                        />
                    </div>

                    <button className={stl2.btnContuctUS} type="submit" >Отправить</button>
                </form>
            </div>
        </section>
    )
}

export default compose(connect(null, { postFormStore }))(ContactUs)