import _ from 'lodash';
import React,{useState} from 'react';
import Slaider from '../header/carusel/Slaider';


class CaruselProduct extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            CaruselImage: []
        }
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

    componentDidMount(){
        this.filterImageCarusel()
    }

    componentWillUnmount(){
        this.CaruselImage = []
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
        
        return <Slaider image={this.state.CaruselImage} settingsCmponent={this.settingsCmponent} />
    }
}

export default CaruselProduct