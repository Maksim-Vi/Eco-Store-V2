import {
  Box,
  Button,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  btnContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '30px'
  }
}));

const DashboardAddButton = (props) => {
  const classes = useStyles();


  return (
    <Box>
      <Box className={classes.btnContainer}>
        <Button color="primary" variant="contained" onClick={() => { props.open() }}>
          {props.text}
        </Button>
      </Box>
    </Box>
  )
};

export default DashboardAddButton;
