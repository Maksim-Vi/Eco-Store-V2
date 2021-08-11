import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import AddProduct from '../products/AddProduct';
import EditProduct from '../products/EditProduct';
import ProductCard from '../products/ProductCard';
import ProductListToolbar from '../products/ProductsToolBar';

const Product = () => {
 
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
    <Container maxWidth={false}>
      <ProductListToolbar openDialog={()=>{handleClickOpen()}}/>
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
