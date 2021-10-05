import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ButtonsList from './components/Button'
import Image from './components/Image';
import Text from './components/Text';
import AddTop from './components/addTopProduct/AddTop';
import DrawerBottomTop from './components/DrawerBottom';
import { Button, Grid } from '@material-ui/core';
import axios from 'axios';
import { getCookie } from '../../components/common/session';
import { useDispatch } from 'react-redux';
import { setTop } from '../../redux/reducers/SRM/top/action';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        '& .MuiListItem-root': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '90%',
            [theme.breakpoints.down('md')]: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                width: '100%',
            },
        },
        '& .MuiListItemSecondaryAction-root': {
            [theme.breakpoints.down('md')]: {
                position: 'initial',
                transform: 'none'
            },
        }
    },
    gridButtonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('md')]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            width: '100%',
        },
    },
    save: {
        fontSize: '14px',
        marginLeft: 5,
        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginTop: 5,
        },
    }

}));


const TopCard = ({ top, products }) => {

    let URL = process.env.SERVER_URL
    const classes = useStyles();
    const dispatch = useDispatch()

    let [topArr, setTopArr] = React.useState(top)
    let [popularItems, setPopularItems] = React.useState([])
    let [openDrower, setOpenDrower] = React.useState(false);

    const toggleDrawer = (type, event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        
        setOpenDrower(type);
    };

    let addTextPopular = (id, text) => {
        let data = []
        popularItems.forEach(i => {
            let checkIsNewItem = (topArr.find(item => item.id === id)) ? false : true
            if (i.id === id) {
                let newData = { id: i.id, text: text, image: i.image , isNew: checkIsNewItem}
                data.push(newData)
            } else {
                data.push(i)
            }
        })
        setPopularItems(data)
    }

    let savePopularAll = async () => {   
        let cookie = getCookie('auth')
        if (popularItems.length > 0 && popularItems.length <= 4) {
            let res = await axios.post(`${URL}/populars`, popularItems, {
                headers: {
                    'authorization': cookie,
                    'Accept': 'application/json',
                },
            })

            if (res.status === 200) {
                dispatch(setTop(res.data.tops))
                setTopArr(res.data.tops)
                setPopularItems(res.data.tops)
            }
        }
    }

    let deleteAll = async () => {
        let cookie = getCookie('auth')
        if (popularItems.length > 0 && popularItems.length <= 4) {
            let res = await axios.delete(`${URL}/populars`, {
                headers: {
                    'authorization': cookie,
                    'Accept': 'application/json',
                },
            })
            setPopularItems([])
            setTopArr([])
            dispatch(setTop([]))
        }
    }

    React.useEffect(() => {
        if (top.length > 0) {
            setPopularItems(top)
            setTopArr(top)
        }
    }, [])

    //topArr.length === 0 && popularItems.length > 0 && popularItems.length <= 4
    return (
        <Grid container spacing={3}>
            <Grid className={classes.gridButtonContainer} item xs={12}>
                <AddTop toggleDrawer={toggleDrawer} />
                {popularItems.length > 0 &&
                    <Button className={classes.save} variant="contained" color="primary" onClick={() => { savePopularAll() }}>
                        сохранить
                    </Button>
                }
                {popularItems.length > 0 &&
                    <Button className={classes.save} variant="contained" color="secondary" onClick={() => { deleteAll() }}>
                        удалить все
                    </Button>
                }
            </Grid>

            <List dense={false} className={classes.root}>
                {popularItems.length > 0 &&
                    popularItems.map(item => {
                        return (
                            <ListItem key={item.id} className={classes.container}>
                                <Image url={item.image} />
                                <Text id={item.id} text={item.text} addTextPopular={addTextPopular} />
                                <ButtonsList item={item} top={topArr} setTopArr={setTopArr} setPopularItems={setPopularItems}/>
                            </ListItem>
                        )
                    })
                }
            </List>
            {openDrower === true &&
                <DrawerBottomTop open={openDrower}
                    toggleDrawer={toggleDrawer}
                    products={products}
                    setPopularItems={setPopularItems}
                    popularItems={popularItems}
                    top={top} />
            }
        </Grid>
    );
}

export default TopCard