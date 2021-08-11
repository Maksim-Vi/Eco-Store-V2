import React from 'react';
import HeaderMain from '../components/header/headerMain';
import s from '../styles/contacts.module.scss'

const Contacts = () =>{
    return (
        <HeaderMain title="Eco Choice Contact">
             <div className={s.containerContactUs}>
                    <strong className={s.title}>НАШИ КОНТАКТЫ</strong>
                    <div className={s.worksDay}>
                        <strong>График работы:</strong>
                        <ul>
                            <li>пн-пт: 10:00 - 19:00</li>
                            <li>сб: 11:00 - 15:00</li>
                        </ul>
                    </div>
                    <div className={s.phoneMenager}>
                        <strong>Менеджер:</strong>
                        <ul>
                            <li>+380674550801 - Екатерина (Viber, Telegram)</li>
                        </ul>
                    </div>
                    <div className={s.emailContactUs}>
                        <strong>Email:</strong>
                        <ul>
                            <li>info.ecoChoice@gmail.com</li>
                        </ul>
                    </div>
					
                    <div className={s.HomeAdres}>
                        <strong>Адрес для самовывоза</strong>
                        <ul>
                            <li>г. Киев, Березняки (более детально у менеджера)</li>
                        </ul>
                    </div>
                    {/* <img className='mapContactUs' src='/map.png' alt=""/> */}
                </div>
        </HeaderMain>
    )
}

export default Contacts