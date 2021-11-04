import {
  Box,
  CardHeader,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import AddProduct from '../products/AddProduct';
import EditProduct from '../products/EditProduct';
import ProductCard from '../products/ProductCard';
import DashboardAddButton from '../utilits/DashboardAddButton';

const useStyles = makeStyles((theme) => ({
  productContainer: {
    [theme.breakpoints.down('md')]: {
      '&.MuiContainer-root':{
        paddingLeft: 0,
        paddingRight: 0
      }
    },
  },
}));


const Product = () => {
  
  const classes = useStyles();
  const products = useSelector(state => state.CRM_products.products)
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState({
    state: false,
    id: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleClickEdit = (id) => {
    setEdit({...edit,
      state: true,
      id: id
    });
  };

  const handleCloseEdit = () => {
    setEdit({...edit,
      state: false,
      id: ''
    });
  };


  return (
    <>
    <Container className={classes.productContainer} maxWidth={false}>
    <CardHeader subheader="На этой вкладке можно отредактировать или добавить товар" title="Товары"/>
      <DashboardAddButton openDialog={()=>{handleClickOpen()}} textButton={'Добавить Товар'}/>
      <Box sx={{ pt: 3 }}>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product.id} lg={4} md={6} xs={12}>
              <ProductCard product={product} openEditCard={handleClickEdit} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>

    {open &&
      <AddProduct open={open} closeDialog={()=>{handleClose()}}/>
    }

    {edit.state &&
      <EditProduct open={edit} productId={edit.id} closeDialog={()=>{handleCloseEdit()}}/>
    }
    </>
  )
};

export default Product;
