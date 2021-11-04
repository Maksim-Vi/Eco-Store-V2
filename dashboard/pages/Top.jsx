import React from 'react';
import {CardHeader, Container,Grid, makeStyles} from '@material-ui/core';
import TopCard from '../top/TopCard';

const useStyles = makeStyles((theme) => ({
  topContainer: {
    [theme.breakpoints.down('md')]: {
      
      '&.MuiContainer-root':{
        paddingLeft: 0,
        paddingRight: 0
      }
    },
  },
  topHeader:{
    [theme.breakpoints.down('md')]: {
      padding: 0,
      marginBottom: 15
    }, 
  }
}));
  
const Top = (props) => {
  const classes = useStyles();
  return (
    <Container className={classes.topContainer} maxWidth={false}>
      <CardHeader  className={classes.topHeader} subheader="На этой вкладке можно отредактировать топ товары с главной страницы сайта" title="Топ товаров"/>
      <Grid container spacing={3}>
        <TopCard top={props.top} products={props.products}/>
      </Grid>
    </Container>
  )
};
  
export default Top;
  