import React from 'react'
import TextField from '@material-ui/core/TextField';
import s from '../../../styles/header/basketItems.module.scss'
import { totalPriceCount } from '../../common/utilits';
import { useDispatch, useSelector } from 'react-redux';
import { setPromocode } from '../../../redux/reducers/form-reducer';

const BasketTotal = ({setCreateOrder,itemsAll}) => {

    const dispatch = useDispatch()
    const form = useSelector(state => state.answerForm)
    const [promoCode, setPromoCode] = React.useState(form.promocode)

    let hendlerNextStepOrder = () =>{
        dispatch(setPromocode(promoCode))
        setCreateOrder(true)
    }

    return (
        <div className={s.TotalContainer}>
            <div className={s.totalCount}>
                <span>Общая сумма заказа:</span><span className={s.totalCountPrice}>{totalPriceCount(itemsAll)} грн</span>
            </div>
            <div className={s.promocode}>
                <span>Промокод:</span>
                <TextField id="outlined-basic" 
                           label="промокод" 
                           variant="outlined" 
                           value={promoCode} 
                           onChange={(e)=>{setPromoCode(e.target.value)}} />
            </div>
            <hr />
            <button className={s.btnBasket} onClick={()=>{hendlerNextStepOrder()}}>Далее к оформлению заказа</button>
        </div>
    )
}

export default BasketTotal