import React, { useContext, useEffect } from 'react';
import { AuchContext } from '../components/common/Context/context.hook';
import Head from "next/head";
import DashboardSidebar from './layoutsDashbord/DashboardSidebar';
import DashboardNavbar from './layoutsDashbord/DashboardNavbar';
import { Container, makeStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useRouter } from 'next/router'
import { checkisVerifyToken } from '../utility/middlware';
import { getCookie } from '../components/common/session';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const DashboardMain = ({ children, titleHome = 'Main Dashboard' }) => {

  const classes = useStyles();
   
  const [open, setOpen] = React.useState(true);

  const handleDrawer = () => {
    setOpen(!open);
  };
 
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Head>
        <title>{titleHome}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="Eco,EcoChoice,ecochioce,eco choice,эко,экотовары,эковыбор,эко-товары, эко выбор, эко боксы, эко бокс. эко подарки, эко подарок, эко подарок, эко подарок киев, подарки киев." />
        <meta name="description" content='dashboard eco choice' />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300&family=Open+Sans:wght@300;600&family=Recursive:wght@300;500&family=Work+Sans:wght@300;400&display=swap" rel="stylesheet" />
      </Head>

      <DashboardNavbar handleDrawer={() => { handleDrawer() }} open={open} />
      <DashboardSidebar handleDrawer={() => { handleDrawer() }} open={open} />

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth="lg">
          {children}
        </Container>
      </main>

      <style jsx global>{`
              *{
                  margin:0;
                  padding:0;
                  box-sizing: border-box;
                  font-family: 'Work Sans', sans-serif;
              },
              *, *:before, *:after {
                  -webkit-box-sizing: border-box;
                  -moz-box-sizing: border-box;
                  box-sizing: border-box;
              }
              }
          `}</style>
    </div>
  )
  // }
}

export default DashboardMain