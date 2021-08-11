import React from 'react';
import stl from '../../styles/footer.module.scss'
import Link from 'next/link'

const Footer = () => {
    return (
        <>
            <footer className={stl.footer}>
                <div className={stl.logoFooter}>
                    <img src="/contentImg/logo.png"  alt="logo"/>
                </div>
                <div className={stl.navFooter}>
                    <div className={stl.navLink} style={{ marginRight: '50px' }}>
                        <Link href="/products" as={'/products'}><a>Продукция</a></Link>
                        <Link href="/contacts" as={'/contacts'}>Связаться с нами</Link>
                        <Link href="/promotions" as={'/promotions'}><a>Акции</a></Link>
                    </div>
                    <div className={stl.navLink}>
                        <Link href="/about-us" as={'/about-us'}><a>О нас</a></Link>
                        <Link href="/payement-and-delivery" as={'/payement-and-delivery'}><a>Оплата и доставка</a></Link>
                        <Link href="/contacts" as={'/contacts'}><a>Контакты</a></Link>
                    </div>
                </div>
                <div className={stl.desc}>
                    <p>+380674550801</p>
                    <p>info.ecochoice@gmail.com</p>
                </div>
                <div className={stl.worksDay}>
                    <strong>График работы:</strong>
                    <span>пн-пт: 10:00 - 19:00</span>
                    <span>сб: 11:00 - 15:00</span>
                    {false &&
                        <span className={stl.vacationDay}>01.05-04.05 выходные дни</span>
                    }
                </div>
                <div className={stl.socialFooter}>
                    <a target="_blank" href="https://www.instagram.com/eco_choice_kiev/?igshid=1fpichowdcraw"><img className={stl.image} src="/contentImg/sotial/instagram.png" alt="instagram" /></a>
                    <a target="_blank" href="https://www.facebook.com/ecochoice.com.ua/"><img className={stl.image} src="/contentImg/sotial/facebook.png" alt="facebook"/></a>
                    <a target="_blank" href="https://www.google.com/maps/place/Eco+Choice+(%D0%98%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82-%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD)/@50.4253051,30.6000508,17z/data=!3m1!4b1!4m5!3m4!1s0x40d4c5071128ef33:0xa2cc72d01ed0d8cb!8m2!3d50.4253051!4d30.6022395"><img className={stl.image} src="/contentImg/sotial/mail.png" alt="mail"/></a>
                </div>
            </footer>
            <div className={stl.footerBottom}>
                <p><span style={{ color: 'green' }}>ECO</span> Choice. All Rights Reserved <span style={{ color: 'green' }}>|</span> Design by store's own production</p>
            </div>
        </>);
}

export default Footer;