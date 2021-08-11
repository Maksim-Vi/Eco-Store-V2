import React,{useState} from 'react';
import s from '../../../../styles/slaider.module.scss'


const ButtonSlider = ({settingsCmponent,hendlerPrevClick,hendlerNextClick}) => {
   
    return (
        <>
            {settingsCmponent.navigation
                ? <>
                    <button onClick={hendlerPrevClick} className={s.carousel_control_Prev}>&#8249;</button>
                    <button onClick={hendlerNextClick} className={s.carousel_control_Next}>&#8250;</button>
                </>
                : null
            }
        </>
    ) 
   
}

export default ButtonSlider