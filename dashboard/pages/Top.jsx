import React from 'react';
import {CardHeader, Container,Grid} from '@material-ui/core';
import TopCard from '../top/TopCard';
 
  
const Top = () => (
    <Container maxWidth={false}>
      <CardHeader subheader="На этой вкладке можно отредактировать топ товары с главной страницы сайта" title="Топ товаров"/>
      <Grid container spacing={3}>
        <TopCard />
      </Grid>
    </Container>
);
  
export default Top;
  