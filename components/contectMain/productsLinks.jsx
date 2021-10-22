import { Avatar, Box, Typography } from '@material-ui/core'
import React from 'react'
import CarouselLinks from '../../utility/Carousels/CarouselLinks'
import { Links } from '../common/utilits'
import s from '../../styles/sliderStyles/linksSlider.module.scss'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { setItemDropdownMenu } from '../../redux/reducers/store-reducer'

const ProductsLinks = () => {

    let dispatch = useDispatch()
    const router = useRouter()

    let linkTo = (type) => {
        dispatch(setItemDropdownMenu(type))
        router.push('/products')
    }

    return (
        <CarouselLinks className={s.linksCarousel} itemClass={s.itemClass}>
            {Links().map(item => {
                return <Box className={s.linksContainer} key={item.id}>
                    <img className={s.linksImg}
                        variant="square"
                        src={`/navImg/nav${item.id}img.png`}
                        alt={`nav${item.id}img`}
                        draggable="false"
                        onClick={() => { linkTo(item.typeLink) }} />
                    <Typography variant="inherit">{item.title}</Typography>
                </Box>
            })}
        </CarouselLinks>
    )
}

export default ProductsLinks
