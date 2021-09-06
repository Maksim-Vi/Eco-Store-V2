import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Button} from '@material-ui/core';
import List from './DrawerList/List';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    save:{
        display: 'block',
        marginLeft:'auto'
    }
});

export default function DrawerBottomTop(props) {
    const classes = useStyles();
   
    let addPopularItem = (popular) =>{
        if(props.popularItems.length === 0 && popular.isCheked){
            props.setPopularItems([...props.popularItems,popular])
        } else if(props.popularItems.length > 0 && popular.isCheked){
            props.popularItems.forEach(item=>{
                if(item.id !== popular.id) {
                    props.setPopularItems([...props.popularItems,popular])
                }
            })
        } else if(props.popularItems.length > 0 && !popular.isCheked){
            let deleteItem = props.popularItems.filter(item=>item.id !== popular.id)
            props.setPopularItems(deleteItem)
        }
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
                        return <List item={item} addPopularItem={addPopularItem} popularItems={props.popularItems}/>
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
