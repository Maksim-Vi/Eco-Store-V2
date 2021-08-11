import React from 'react';
import ButtonSlider from '../Button/buttonSlider';
import Dots from '../Dots/Dots';

const Navigation = ({settingsCmponent,hendlerPrevClick,hendlerNextClick,currentImg,image,setCurrentClick}) =>{
    return (<>
        <ButtonSlider settingsCmponent={settingsCmponent} hendlerPrevClick={hendlerPrevClick} hendlerNextClick={hendlerNextClick}/>
        <Dots settingsCmponent={settingsCmponent} setCurrentClick={setCurrentClick} currentImg={currentImg} image={image}/>
    </>)
}

export default Navigation