import React from 'react';
import s from '../../../styles/header/dropDownPopup.module.css'
import ListProductsTop from './listProductTop';
import Link from 'next/link'
import { setItemDropdownMenu } from '../../../redux/reducers/store-reducer';
import { useDispatch } from 'react-redux';

const ListItems = (props) => {
    let dispatch = useDispatch()

    let hendlerClickProducts = (item) =>{
        dispatch(setItemDropdownMenu(item.type))
        props.toggle()
    }

    return (
    <div className={s.listContainerNav_Item}>
        {props.open && 
        <div className={s.divList}>
              <ul className={s.ListContainer}>
                {props.itemsTab.map(item => (
                    <li className={s.divListItem} key={item.id} onClick={()=>{hendlerClickProducts(item)}}>
                        <Link href="/products" as={'/products'}><a>{item.name}</a></Link>
                    </li>
                ))}
              </ul>  
              <ListProductsTop open={props.open}/>
        </div>
        }  
    </div>)
}

export default ListItems
