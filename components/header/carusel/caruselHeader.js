import React,{useState} from 'react';
import Slaider from './Slaider';


const CaruselHeader = () =>{
    // let img1 = "/contentImg/SliderSale/BFriday_Banner.jpg"
    let img2 = "/contentImg/SliderSale/Delivery_Banner.jpg"
    let img3 = "/contentImg/SliderSale/Friend_Banner.jpg"

    let image=[
        // { "id": 1, "img": img1 },
        { "id": 1, "img": img2 },
        { "id": 2, "img": img3 },
    ]

    const [settingsCmponent, setSettingsCmponent] = useState({
        value: 'cycle',
        isCounter: true,
        isCounter_Speed: 15000,
        dots: true,
        navigation:true,
        stateImage: 'oneImage',
      })

    return <Slaider image={image} settingsCmponent={settingsCmponent} />
}

export default CaruselHeader