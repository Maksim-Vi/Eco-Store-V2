import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Image from './components/Image';
import Text from './components/Text';
import Button from './components/Button';
import { useSelector } from 'react-redux';
import AddTop from './components/addTopProduct/AddTop';
import DrawerBottomTop from './components/DrawerBottom';

const useStyles = makeStyles((theme) => ({
    root: {
        display:'flex',
        alignItems: 'center',
        justifyContent:'center',
        flexDirection:'column',
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        '& .MuiListItem-root': {
            width: '70%',
        }
    },
   
}));


export default function TopCard() {
    const classes = useStyles();

    const top = useSelector(state => state.CRM_top.top)
    const products = useSelector(state => state.CRM_products.products)

    const [openDrower, setOpenDrower] = React.useState(false);
    
    const toggleDrawer = (type,event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrower(type);
    };

    return (
        <>
        <List dense={false} className={classes.root}>
            {top.length > 0 
                ? top.map(item=>{
                    return (
                        <>
                            {top.length !== 4 && <AddTop  toggleDrawer={toggleDrawer}/>}
                            <ListItem key={item.id} className={classes.container}>
                                <Image url={item.url}/>
                                <Text text={item.text}/>
                                <Button toggleDrawer={toggleDrawer}/>
                            </ListItem>
                        </>
                    )
                })
                : <AddTop  toggleDrawer={toggleDrawer}/>
            }
        </List>
        {openDrower === true &&
            <DrawerBottomTop open={openDrower} toggleDrawer={toggleDrawer} products={products}/>
        }
        </>
    );
}