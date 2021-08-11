import React from 'react';
import s from '../../../styles/preloader.module.scss'
const Preloader = () =>{
    return (<div className={s.loaderContainer}>
        <div className={s.loader}></div>
        </div>)
}

export default Preloader