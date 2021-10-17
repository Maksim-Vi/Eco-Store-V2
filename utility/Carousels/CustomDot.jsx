import { Avatar, makeStyles } from '@material-ui/core';
import React from 'react'
import '../../styles/sliderStyles/productSlider.module.scss'

const useStyles = makeStyles((theme) => ({
    image:{
        width: '100px',
        height: 'auto',
    }
}))


export const CustomDot = ({ images, onClick, ...rest }) => {

    const classes = useStyles();
    const {
        index,
        active,
        carouselState
      } = rest;
   
      return (
        <button
          className={active ? "active" : "inactive"}
          onClick={() => onClick()}
        >
          {/* {images.map(img=>{
              return <Avatar variant="square" className={classes.image} src={img.img} alt="item" />
          })

          } */}
          <Avatar variant="square" className={classes.image} src={images[index].img} alt="item" />
        </button>
      );
}
