import React from 'react';
import {CardHeader, Container,Grid} from '@material-ui/core';
import TopCard from '../top/TopCard';
import { useSelector } from 'react-redux';
 
  
const Top = (props) => {
  return (
    <Container maxWidth={false}>
      <CardHeader subheader="На этой вкладке можно отредактировать топ товары с главной страницы сайта" title="Топ товаров"/>
      <Grid container spacing={3}>
        <TopCard top={props.top} products={props.products}/>
      </Grid>
    </Container>
  )
};
  
export default Top;
  