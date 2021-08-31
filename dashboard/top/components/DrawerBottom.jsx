import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Avatar, Button, Checkbox, FormControlLabel } from '@material-ui/core';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    avatar:{
        marginRight: 20
    },
    checkMark:{
        marginLeft: 20
    }
});

export default function DrawerBottomTop(props) {
    const classes = useStyles();
    let [selected,setSelected] = React.useState(false)

    let handleCheked = () =>{
        setSelected(!selected)
    }

    let list = () => {
        return (
            <div
                className={clsx(classes.list, {
                    [classes.fullList]: true,
                })}
                role="presentation"
                onKeyDown={(e) => { props.toggleDrawer(false,e) }}
            >
                {props.products.length > 0 &&
                    props.products.map(item=>{
                        return (
                            <ListItem button key={item.id}>
                                <Avatar className={classes.avatar} alt="Remy Sharp" src={item.images[0].url.split('public')[1]} />
                                <ListItemText primary={item.name} />
                                <Button  variant="contained" 
                                        color="primary" 
                                        onClick={()=>{handleCheked()}}>
                                    для выбора товара в топ нажмите на кнопку
                                </Button>
                                <FormControlLabel className={classes.checkMark}
                                    control={
                                    <Checkbox
                                        disabled 
                                        checked={selected}
                                        name="checked"
                                        color="primary"
                                    />
                                    }
                                />
                            </ListItem>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <React.Fragment>
            <SwipeableDrawer
                anchor={'bottom'}
                open={props.open}
                onClose={(e)=>{props.toggleDrawer(false,e)}}
                onOpen={(e)=>{props.toggleDrawer(true,e)}}
            >
                {list()}
            </SwipeableDrawer>
        </React.Fragment>
    );
}
