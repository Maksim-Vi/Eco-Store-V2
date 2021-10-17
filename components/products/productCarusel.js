
import React from 'react';
import { Avatar } from '@material-ui/core';
import _ from 'lodash';
import CarouselProduct from '../../utility/Carousels/CarouselProduct';
import s from '../../styles/sliderStyles/productSlider.module.scss'
import SetFullScreen from '../../utility/Carousels/FullScreen';

const CaruselProduct = (props) => {

    const [isFullScreen, setIsFullScreen] = React.useState(false)
    const [state, setState] = React.useState({ CaruselImage: [] })

    let filterImageCarusel = () => {
        let imgCarusel = []
        _.forEach(props.item.images, (img, index) => {
            if (img.url !== undefined && img.url !== '') {
                imgCarusel.push({ "id": index + 1, "img": `${process.env.SERVER_UPLOAD_URL}/${img.url}` })
            }
        })
        setState({ CaruselImage: imgCarusel })
    }

    React.useEffect(() => {
        if (state.CaruselImage.length === 0) {
            filterImageCarusel()
        }
    }, [])

    if (state.CaruselImage.length === 0) return null

    return (
        <div className={s.sectionContainer}>
            <SetFullScreen isFullScreen={isFullScreen}>
                <CarouselProduct images={state.CaruselImage}>
                    {state.CaruselImage.map((image,index) => {
                        return <Avatar 
                                    key={index}
                                    variant="square"
                                    className={s.image}
                                    src={image.img}
                                    alt="item"
                                    onClick={() => { setIsFullScreen(!isFullScreen) }} />
                    })}
                </CarouselProduct>
            </SetFullScreen>
        </div>
    )
}

export default CaruselProduct