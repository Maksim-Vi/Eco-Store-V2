import React from 'react';
import stl2 from '../../styles/content/contactUs.module.scss'

export const InputName = ({input,meta}) =>{
    const showError = meta.touched && meta.error;
    return ( 
        <div className={stl2.containerInput+" "+ (showError ? stl2.error : "")} style={{ marginRight: 'auto' }}>         
            <input {...input} type="contactUS" className={stl2.txtInput} id="name" placeholder="Введите ваше Имя" />
        </div>
    )
} 

export const InputEmail = ({input,meta}) =>{
    const showError = meta.touched && meta.error;
    return ( 
        <div className={stl2.containerInput+" "+ (showError ? stl2.error : "")} style={{ marginRight: 'auto' }}>
            <input {...input} type="contactUS" className={stl2.txtInput} id="contacts" placeholder="Введите ваш email" />
        </div>
    )
} 

export const  Textarea = ({input,meta}) =>{
    const showError = meta.touched && meta.error;
    return (
        <div className={stl2.containerInput +" "+ (showError ? stl2.error : "")}>
            <textarea {...input} type="contactUS" className={stl2.txtArea} name="subject" placeholder="Задайте нам вопрос" />
        </div>
    )
} 


export const required = (v) => {
    if (!v || v === "") {
      return "this field is required";
    }
    return undefined;
};
  
export const maxLength = (max) => (value) =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined
  
export const email = (value) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
    'Invalid email address' : undefined
  


