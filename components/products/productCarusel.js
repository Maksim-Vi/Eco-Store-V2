import React,{useState} from 'react';
import Slaider from '../header/carusel/Slaider';


class CaruselProduct extends React.Component{
    constructor(props) {
        super(props);
        this.CaruselImage = []
        this.settingsCmponent = {
            value: 'cycle',
            isCounter: false,
            isCounter_Speed: 5000,
            dots: true,
            navigation:true,
            stateImage: 'oneImage',
        }
    }

    componentWillUnmount(){
        this.CaruselImage = []
    }

    shouldComponentUpdate(prevProps){
        if(this.props.item !== prevProps.item) return true

        return false

    }

    filterImageCarusel = () =>{
        let URL = process.env.SERVER_URL
        if(this.props.item.image !== null){
            this.CaruselImage.push({ "id": 1, "img": `${URL}/${ this.props.item.image}` })
        } 
        if(this.props.item.image1 !== null){
            this.CaruselImage.push({ "id": 2, "img": `${URL}/${ this.props.item.image1}` })
        } 
        if(this.props.item.image2 !== null){
            this.CaruselImage.push({ "id": 3, "img": `${URL}/${ this.props.item.image2}` })
        } 
        if(this.props.item.image3 !== null){
            this.CaruselImage.push({ "id": 4, "img": `${URL}/${ this.props.item.image3}` })
        }
    }
   
    render() {
        this.filterImageCarusel()
        return <Slaider image={this.CaruselImage} settingsCmponent={this.settingsCmponent} />
    }
}

export default CaruselProduct