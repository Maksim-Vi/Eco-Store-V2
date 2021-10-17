import React from 'react'
import s from '../../styles/sliderStyles/productSlider.module.scss'

const SetFullScreen = ({ children, isFullScreen }) => {

    return (
        <>
            {isFullScreen
                ? <div className={s.fullscreenContainer}>
                    {children}
                </div>
                : <>{children}</>
            }
        </>
    )
}

export default SetFullScreen
