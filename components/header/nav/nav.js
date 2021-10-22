import React from 'react';
import stl from '../../../styles/header/nav.module.scss'
import Link from 'next/link'
import BasketButton from './common/basketButton';
import PopupProduct from '../dropDown/popupProduct';
import PopupContactUs from './common/PopupContactUs';

const itemsTab = [
    {
      id: 1,
      value: 'Product',
      name:'Все товары',
      type:'1'
    },
    {
      id: 2,
      value: 'Product',
      name:'Столовые приборы',
      type:'приборы'
    },
    {
      id: 3,
      value: 'Product',
      name:'Средства по уходу',
      type:'уход'
    },
    {
        id: 4,
        value: 'Product',
        name:'Трубочки для напитков',
        type:'трубочки'
    },
    {
        id: 5,
        value: 'Product',
        name:'Мешочки для хранения',
        type:'мешочки'
    },
    {
        id: 6,
        value: 'Product',
        name:'Подарочные боксы',
        type:'бокс'
    }
];


const Nav = () => {

    const [openPopupContactUs, setOpenPopupContactUs] = React.useState(false);
    
    const handleClickOpen = () => {
        setOpenPopupContactUs(true);
    };
    const handleClose = () => {
        setOpenPopupContactUs(false);
    };

    return (
        <div className={stl.container}>
            {/* <Link href='' activeClassName={stl.linkActive}><a className={stl.link} onClick={()=>{toggle()}}>ПРОДУКЦИЯ</a></Link> */}
            <PopupProduct itemsTab={itemsTab} />
            <a className={stl.link} onClick={()=>{handleClickOpen()}}>СВЯЗАТЬСЯ С НАМИ</a>
            <Link href="/promotions" as={'/promotions'}><a className={stl.link}>АКЦИИ</a></Link>
            <Link href="/about-us" as={'/about-us'}><a className={stl.link}>О НАС</a></Link>
            {true && <Link href="/reviews" as={'/reviews'}><a className={stl.link}>ОТЗЫВЫ</a></Link>}
            <Link href="/payement-and-delivery" as={'/payement-and-delivery'}><a className={stl.link}>ОПЛАТА И ДОСТАВКА</a></Link>
            <Link href="/contacts" as={'/contacts'}><a className={stl.link}>КОНТАКТЫ</a></Link>
            <BasketButton />

            {openPopupContactUs
                ?<PopupContactUs handleClose={handleClose} open={openPopupContactUs}/>
                :null
            }
        </div>
    )
}

export default Nav
