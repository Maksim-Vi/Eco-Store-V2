import { useRouter } from 'next/router'
import React from 'react'
import s from '../../../../styles/slaider.module.scss'

const FullSceen = ({stateScreen,closeFullScreen,children}) => {
    const router = useRouter()
    return (
        <>
        {stateScreen === true
            ?  <div className={router.pathname !== '/' ? s.fullScreenableNode : s.homeSliderWrapper}>
                    {stateScreen === true ? <span className={s.close} onClick={()=>{closeFullScreen()}}></span> : null}
                    {children}
                </div>
            : <div className={router.pathname === '/' ? s.homeSliderWrapper : s.standartView}>{children}</div>
        }
        </>
       
    )
}

export default FullSceen
