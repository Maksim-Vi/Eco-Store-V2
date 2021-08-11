import {
    Box,
    Button,
    makeStyles
  } from '@material-ui/core';

  const useStyles = makeStyles((theme) => ({
    btnContainer:{
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom:'30px'
    }
  }));

const ProductListToolbar = (props) => {
  const classes = useStyles();
    return (
    <Box {...props}>
      <Box className={classes.btnContainer}>
        <Button color="primary" variant="contained" onClick={()=>{props.openDialog()}}>
          Добавить Товар
        </Button>
      </Box>
    </Box>
    )
};
  
  export default ProductListToolbar;
  