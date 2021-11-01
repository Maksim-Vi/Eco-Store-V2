import React,{useState} from 'react';
import stl from '../../../../styles/header/burgerNav.module.scss'
import Link from 'next/link'
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { totalPriceCount } from '../../../common/utilits';
import PopupContactUs from '../common/PopupContactUs';


const BurgerMenu = () =>{

    const [open, setOpen] = useState(false);
    const [openPopupContactUs, setOpenPopupContactUs] = React.useState(false);
    
    const handleClickOpen = () => {
        setOpenPopupContactUs(true);
        setOpen(false)
    };
    const handleClose = () => {
        setOpenPopupContactUs(false);
    };

    const items = useSelector(state => state.basket.items)

  return (
      <>
    <div>
    {open 
    ? <div className={classnames({
        [`${stl.Menu}`]:true,
        [`${stl.MenuActive}`]: open ,
    })} open={open}>
        <Link href="/products"><a className={stl.Link}>ПРОДУКЦИЯ</a></Link>
        <a className={stl.Link} onClick={()=>{handleClickOpen()}}>СВЯЗАТЬСЯ С НАМИ</a>
        <Link href="/promotions"><a className={stl.Link}>АКЦИИ</a></Link>
        <Link href="/about-us"><a className={stl.Link}>О НАС</a></Link>
        {true && <Link href="/reviews"><a className={stl.link}>ОТЗЫВЫ</a></Link>}
        <Link href="/payement-and-delivery"><a className={stl.Link}>ОПЛАТА И ДОСТАВКА</a></Link>
        <Link href="/contacts"><a className={stl.Link}>КОНТАКТЫ</a></Link>
        <Link href="/basket">
            <a className={stl.Link}>
                КОРЗИНА 
                <span className={stl.LinkBasketCount}>{totalPriceCount(items)}грн | {items.length}шт</span>
            </a>
        </Link>
        
      </div>
       : null}
        <button className={classnames([`${stl.btnHamburger}`],{
            // [`${stl.btnHamburger}`]: true,
            [`${stl.btnHamburgeActive}`]: open,
            
        })} 
              open={open} 
              onClick={()=>setOpen(!open)}
        >
            <div className={classnames({
                [`${stl.Line}`]:true,
                [`${stl.divFActive}`]:open,
                })}/>
            <div className={classnames({
                [`${stl.Line}`]:true,
                [`${stl.divSActive}`]:open,
                })}/>
            <div className={classnames({
                [`${stl.Line}`]:true,
                [`${stl.divTActive}`]:open,
                })}/>
      </button>
    </div>
    {openPopupContactUs
        ?<PopupContactUs handleClose={handleClose} open={openPopupContactUs}/>
        :null
    }
    </>)
}

export default BurgerMenu