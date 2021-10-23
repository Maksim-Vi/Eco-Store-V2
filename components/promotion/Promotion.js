import { Typography } from '@material-ui/core'
import React from 'react'
import s from '../../styles/promotion.module.scss'
import ABS from '../common/abs'

const Promotion = () => {
    return (
        <div className={s.promotionContainer}>
            <p><br /></p>
            <Typography variant="h3">Наши Акционные предложения</Typography>
            <br />
            <div>
                <h2 className={s.title}>1. Подарок при заказе от 350 грн</h2>
                <p className={s.text}>Сделайте заказ на сумму от 350 грн, и получите  приятный бонус - бамбуковую зубную щетку бесплатно. 
                Для получения приятного бонуса при оформлении заказа укажите в строке "промокод" - "я за эко"</p>
            </div>
            <ABS slotId={'1060'} width={100} height={100} />
            <div>
                <h2 className={s.title}>2. Бесплатная доставка Новой Почтой и Укрпочтой.</h2>
                {/* <img src="/contentImg/SliderSale/Delivery_Banner.jpg" alt="free post NP or UP"/> */}
                <p className={s.text}>Бесплатная доставка распространяется на заказы свыше 700 грн при полной оплате заказа на карту, 
                если заказ не превышает указанной суммы, то доставка оплачивается клиентом. 
                (Акция не действительна при оформлении наложенного платежа)
                </p>
            </div>
            <div>
                <h2 className={s.title}>3. Приведи друга и получи приятный бонус для себя и друга.</h2>
                {/* <img src="/contentImg/SliderSale/Friend_Banner.jpg" alt="bonus"/> */}
                <p className={s.text}> Если Вы узнали о нашем магазине от друзей и решили тоже сделать заказ, 
                    то укажите в графе "промокод" - номер телефона и Фио друга от которого Вы узнали о нас.
                    После проверки менеджером,  мы с Вам отправим перерасчет заказа.</p>
            </div>
        
            
        </div>
    )
}

export default Promotion 