import React from 'react';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {grey} from '@material-ui/core/colors';
import {makeStyles} from '@material-ui/core';
import AppAnimate from '../../common/Animate/Amination'

const useStyles = makeStyles((theme) => {
  return {
    button: {
      fontWeight: 600,
      fontSize: 16,
      textTransform: 'capitalize',
    },
    image: {
      width: '100%',
    },
  };
});
const Error404 = () => {
  const router = useRouter();

  const onGoBackToHome = () => {
    router.push('/');
  };

  const classes = useStyles();

  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Box
        py={{xl: 8}}
        flex={1}
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        textAlign='center'>
        <Box
          mb={{xs: 4, xl: 8}}
          width='100%'
          maxWidth={{xs: 400, sm: 600, xl: 706}}>
          <img
            className={classes.image}
            src={'/errorPageImages/404.png'}
            alt='404'
          />
        </Box>
        <Box mb={{xs: 4, xl: 5}}>
          <Box
            variant='h3'
            mb={{xs: 3, xl: 10}}
            fontSize={{xs: 20, md: 24}}
            fontWeight={600}>
            <div>Sorry, but this page not found</div>
          </Box>
          <Box
            mb={{xs: 4, xl: 10}}
            color={grey[600]}
            fontSize={16}
            fontWeight={300}>
            <Typography>
            <div>If you have a question, you can ask us!</div>
            </Typography>
            <Typography>
            <div>Please, could you go Home page</div>
            </Typography>
          </Box>
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            onClick={onGoBackToHome}>
            <div>Home Page</div>
          </Button>
        </Box>
      </Box>
    </AppAnimate>
  );
};

export default Error404;
