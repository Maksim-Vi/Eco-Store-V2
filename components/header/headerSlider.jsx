import { Avatar, makeStyles } from '@material-ui/core'
import React from 'react'
import CarouselWithButtonAndDots from '../../utility/Carousels/CarouselWithButtonAndDots'
import { responsiveOneItem } from '../../utility/Carousels/utils'

const useStyles = makeStyles((theme) => ({
    image:{
        width: '100%',
        height: 'auto',
        pointerEvents: 'none'
    }
}))

const HeaderSlider = () => {

    const classes = useStyles();
    let img2 = "/contentImg/SliderSale/Delivery_Banner.jpg"
    let img3 = "/contentImg/SliderSale/Friend_Banner.jpg"

    let image = [
        // { "id": 1, "img": img1 },
        { "id": 1, "img": img2 },
        { "id": 2, "img": img3 },
    ]

    return (
        <CarouselWithButtonAndDots responsive={responsiveOneItem()} dotsOutside={false} arrows={true}>
            {image.map(image=>{
                return <Avatar variant="square" className={classes.image} src={image.img} alt="item" />
            })}
        </CarouselWithButtonAndDots>
    )
}

export default HeaderSlider
