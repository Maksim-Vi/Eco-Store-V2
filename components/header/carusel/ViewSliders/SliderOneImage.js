import React, { useState } from 'react';
import s from '../../../../styles/slaider.module.scss'
import Navigation from '../Navigation/Navigation';
import { useRouter } from 'next/router';
import FullScreen from '../FullScreen/FullSceen'

const SliderOneImage = ({ image, currentClick, setCurrentClick, settingsCmponent, hendlerPrevClick, hendlerNextClick }) => {
    const router = useRouter()
    
    let [stateScreen, setStateScreen] = useState(false)

    let openFullScreen = () =>{
        if(stateScreen === false && router.pathname !== '/'){
            setStateScreen(true)
        }
    }

    return (
        <FullScreen stateScreen={stateScreen} closeFullScreen={()=>{setStateScreen(false)}}>
            <div className={`${s.wrapper}`}>
                <div className={s.slider}>
                    <div className={s.slides}>
                        <img className={s.slide} src={`${image[currentClick].img}`} alt="item" onClick={()=>{openFullScreen()}} />
                    </div>
                </div>
                <Navigation settingsCmponent={settingsCmponent} setCurrentClick={setCurrentClick} hendlerPrevClick={hendlerPrevClick} hendlerNextClick={hendlerNextClick} currentImg={image[currentClick]} image={image} />
            </div>
        </FullScreen>
    )
}

export default SliderOneImage