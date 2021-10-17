
import React from 'react';
import { Avatar } from '@material-ui/core';
import _ from 'lodash';
import CarouselProduct from '../../utility/Carousels/CarouselProduct';
import s from '../../styles/sliderStyles/productSlider.module.scss'
class CaruselProduct extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            CaruselImage: []
        }
    }

    componentDidMount(){
        this.filterImageCarusel()
    }

    shouldComponentUpdate(prevProps, prevState){
        if(this.props.item !== prevProps.item) return true
        if(this.props.CaruselImage !== prevState.CaruselImage) return true

        return false

    }

    filterImageCarusel = () =>{
        let imgCarusel = []
        _.forEach(this.props.item.images,(img,index) => {
            if(img.url !== undefined && img.url !== ''){
                imgCarusel.push({ "id": index+ 1, "img": `${process.env.SERVER_UPLOAD_URL}/${img.url}` })
            }
        })
        this.setState({CaruselImage: imgCarusel})
    }
   
    render() {
        if(this.state.CaruselImage.length === 0) return null
        
        return (
            <div className={s.sectionContainer}>
                <CarouselProduct images={this.state.CaruselImage}>
                        {this.state.CaruselImage.map(image=>{
                            return <Avatar variant="square" className={s.image} src={image.img} alt="item" />
                        })}
                </CarouselProduct>
            </div>
        ) 
    }
}

export default CaruselProduct