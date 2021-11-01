import React from 'react';
import stl from '../../styles/header/header.module.scss'
import Link from 'next/link'
import BurgerMenu from './nav/Hamburger/burgerNav';
import { useSelector } from 'react-redux';

const Header = () => {
    const items = useSelector(state => state.basket.items)
    return (
        <div className={stl.wrapper}>
            <div className={stl.container}>
                <div id="topHead" className={stl.topHead}>
                    <div className={stl.contactsWrapper}>
                        <div className={stl.contactsContainer}>
                            <span className={stl.number}>+380674550801</span>
                            <span className={stl.email}>info.ecochoice@gmail.com</span>
                        </div>
                        <a target="_blank" href="https://t.me/Katerina_EcoChoice" className={stl.telegram}></a>
                    </div>
                    
                    {false &&
                        <span className={stl.vacationDay}>01.05-04.05 выходные дни</span>
                    }
                   
                    <div className={stl.mobileBasletContainer}>
                        <Link href="/basket">
                            <a className={stl.LinkBasket}><span className={stl.basketCount}>{items.length}</span></a>
                        </Link>
                    </div>

                    <div className={stl.social}>
                        <a target="_blank" href="https://www.instagram.com/eco_choice_kiev/?igshid=1fpichowdcraw"><img className={stl.image} src="/contentImg/sotial/instagram.png" alt="instagram" /></a>
                        <a target="_blank" href="https://www.facebook.com/ecochoice.com.ua/"><img className={stl.image} src="/contentImg/sotial/facebook.png" alt="facebook" /></a>
                        <a target="_blank" href="https://www.google.com/maps/place/Eco+Choice+(%D0%98%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82-%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD)/@50.4253051,30.6000508,17z/data=!3m1!4b1!4m5!3m4!1s0x40d4c5071128ef33:0xa2cc72d01ed0d8cb!8m2!3d50.4253051!4d30.6022395"><img className={stl.image} src="/contentImg/sotial/mail.png" alt="mail" /></a>
                    </div>
                    <div className={stl.burgerNav}>
                        <BurgerMenu />
                    </div>
                </div>
                <div className={stl.middleHead}>
                    <Link href="/"><img className={stl.logo} src="/contentImg/logo.png" alt="logo" /></Link>
                    <div className={stl.text}>
                        <span><span className={stl.textEco}>Эко </span>товары в каждый дом</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header