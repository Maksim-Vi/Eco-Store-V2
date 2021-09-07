import React, { useContext } from 'react';
import {makeStyles, IconButton, Badge, Button } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Link from 'next/link'
import { useDispatch } from 'react-redux';
import { deleteToken, SRM_Logout } from '../../redux/reducers/SRM/user/action';
import { AuchContext } from '../../components/common/Context/context.hook';
import { removeCookie } from '../../components/common/session';

const useStyles = makeStyles((theme) => ({
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        marginLeft: 'auto'
      },
    },
  }));

const NavNorifi = () => {

  let auch = useContext(AuchContext)
  const classes = useStyles();
  let dispatch = useDispatch()

  let Logout =  () =>{
    removeCookie('auth')
    auch.logout()
    dispatch(deleteToken())
  }

  return (
    <div className={classes.sectionDesktop}>
        <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
                <MailIcon />
            </Badge>
        </IconButton>
        <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
            </Badge>
        </IconButton>
        <Link href="/AdminPanel/Register" as={'/AdminPanel/Register'}><Button color="inherit" >регистрация</Button></Link>
        <Link href="/" as={'/'}><Button color="inherit" onClick={()=>{Logout()}}>выйти</Button></Link>
    </div>
  );
};

export default NavNorifi;