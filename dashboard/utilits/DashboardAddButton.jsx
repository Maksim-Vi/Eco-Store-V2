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

const DashboardAddButton = (props) => {
  const classes = useStyles();
    return (
    <Box {...props}>
      <Box className={classes.btnContainer}>
        <Button color="primary" variant="contained" onClick={()=>{props.openDialog()}}>
          {props.textButton}
        </Button>
      </Box>
    </Box>
    )
};
  
  export default DashboardAddButton;
  