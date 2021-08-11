import React from 'react';
import s from  '../../../../styles/slaider.module.scss'
import classNames from 'classnames';

const Dots = ({settingsCmponent,currentImg,image,setCurrentClick,currentClick}) => {
   
    const ClickOnDot = (id) =>{
        setCurrentClick(id-1)
    }

    return(<>
        {settingsCmponent.dots 
        ? <ol className={s.carousel_Dots}>
                {image 
                 ? image.map(item =>{
                    return <li key={item.id}>
                        <label className={classNames(`${s.carousel_Dot}`,{
                            [`${s.carousel_Dot_Active}`]: item.id === currentImg.id
                        })}
                        onClick={()=>{ClickOnDot(item.id)}}>•</label>
                    </li>
                 })
                 : null
                 }
            </ol>
        : null
       }
    </>)
}

export default Dots