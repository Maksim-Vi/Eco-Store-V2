import React from 'react';
import {CardHeader, Container,Grid} from '@material-ui/core';
 
  
const Top = () => (
    <Container maxWidth={false}>
      <Grid container spacing={3}>
        <CardHeader subheader="На этой вкладке можно отредактировать топ товары с главной страницы сайта" title="Топ товаров"/>
      </Grid>
    </Container>
);
  
export default Top;
  