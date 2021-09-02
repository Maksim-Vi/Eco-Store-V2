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
    },
    save:{
        display: 'block',
        marginLeft:'auto'
    }
});

export default function DrawerBottomTop(props) {
    const classes = useStyles();

    let [selected,setSelected] = React.useState(false)
    let [popularItems, setPopularItems] = React.useState([])

    let handleCheked = (item) =>{
        setSelected(!selected)
        let isSelect = !selected
       
        let data = {
            id: item.id,
            url: item.images[0].url
        }
        if(popularItems.length > 0){
            popularItems.forEach(i=>{
                if(i.id !== item.id && isSelect){
                    setPopularItems([...popularItems,data])
                }else if(i.id === item.id && !isSelect) {
                    let newData = []
                    newData = popularItems.filter(i=> i.id !== item.id)
                    setPopularItems(newData)
                }
            })
        } else {
            setPopularItems([...popularItems,data])
        }
        
        
    }

    console.log(`ANSWER`, popularItems);

    let list = () => {
        return (
            <div
                className={clsx(classes.list, {
                    [classes.fullList]: true,
                })}
                role="presentation"
                onKeyDown={(e) => { props.toggleDrawer(false,e) }}
            >
                <Button className={classes.save}  variant="contained" color="primary" onClick={()=>{props.toggleDrawer(false)}}>
                    сохранить 
                </Button>
                {props.products.length > 0 &&
                    props.products.map(item=>{
                        return (
                            <ListItem button key={item.id}>
                                <Avatar className={classes.avatar} alt="Remy Sharp" src={item.images[0].url.split('public')[1]} />
                                <ListItemText primary={item.name} />
                                <Button  variant="contained" 
                                        color="primary" 
                                        onClick={()=>{handleCheked(item)}}>
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
