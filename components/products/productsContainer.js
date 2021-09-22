import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import s from '../../styles/content/products.module.scss'
import { useProductsStyles } from '../../styles/stylesUI/products';
import classnames from 'classnames'
import ListProduct from './listProducts';
import { useDispatch, useSelector } from 'react-redux';
import { setStore } from '../../redux/reducers/store-reducer';
import { setFilter } from '../../redux/reducers/filter-reducer';
import { sortBy } from '../common/utilits';
import ABS from '../common/abs';
import BuyMenuItem from './component/BuyMenu/BuyMenuItem';

const ProductsContainer = ({items}) => {

    const classes = useProductsStyles();
    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)

    const [value, setValue] = React.useState(0);
    const [openBuyMenu, setOpenBuyMenu] = React.useState({
        isOpen: false,
        item: {}
    })
    const [inLine, setInLine] = React.useState(false)

    let handleChange = (newValue) => {
        setValue(newValue);
        if(newValue === 0){
            dispatch(setFilter('all'))
        } else if(newValue === 1){
            dispatch(setFilter('expensive'))
        } else {
            dispatch(setFilter('cheap'))
        }
    };

    let hendlerOpenBuyMenu = (item) =>{
        setOpenBuyMenu({isOpen: true,item: item})
    }

    let hendlerCloseBuyMenu = () =>{
        setOpenBuyMenu({isOpen: false,item: {}})
    }

    useEffect(() => {
        dispatch(setStore(items))
    }, [dispatch])

    if (items === undefined){
        return  <section className={classes.sectionProducts}>data</section>
    }

    return (
        <section className={classes.sectionProducts}>
            <Paper className={classes.root} className={classes.toggleContainer}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Все" />
                    <Tab label="Дорогие" />
                    <Tab label="Дешевые" />
                </Tabs>
                {/* <button onClick={()=>{setInLine(true)}}>toggle</button>
                    <button onClick={()=>{setInLine(false)}}>toggle</button> */}
            </Paper>
            <div className={s.contentProductContainer}>
                <ul className={classnames(s.CardContainer, {
                    [`${s.inLineBlock}`]: inLine === true
                })}>
                    {items.length > 0
                        ? <>{sortBy(items,filter.Filter).map(item => { 
                                return <ListProduct key={item.id} item={item} OpenBuyMenu={hendlerOpenBuyMenu}/> 
                            })}
                        </>
                        : null
                    }

                </ul>
            </div>
            {openBuyMenu.isOpen && <BuyMenuItem CloseBuyMenu={hendlerCloseBuyMenu} open={openBuyMenu.isOpen} item={openBuyMenu.item}/>}

            <ABS slotId={'1045'} width={100} height={100} />
        </section>
    )
}


export default ProductsContainer