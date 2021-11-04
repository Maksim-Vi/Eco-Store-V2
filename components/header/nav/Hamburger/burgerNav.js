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
        <Link href="/products"><p className={stl.Link}>ПРОДУКЦИЯ</p></Link>
        <p className={stl.Link} onClick={()=>{handleClickOpen()}}>СВЯЗАТЬСЯ С НАМИ</p>
        <Link href="/promotions"><p className={stl.Link}>АКЦИИ</p></Link>
        <Link href="/about-us"><p className={stl.Link}>О НАС</p></Link>
        {true && <Link href="/reviews"><p className={stl.Link}>ОТЗЫВЫ</p></Link>}
        <Link href="/payement-and-delivery"><p className={stl.Link}>ОПЛАТА И ДОСТАВКА</p></Link>
        <Link href="/contacts"><p className={stl.Link}>КОНТАКТЫ</p></Link>
        <Link href="/basket">
            <p className={stl.Link}>
                КОРЗИНА 
                <span className={stl.LinkBasketCount}>{totalPriceCount(items)}грн | {items.length}шт</span>
            </p>
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