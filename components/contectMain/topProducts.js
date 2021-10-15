import React from 'react';
import stl from '../../styles/content/topProducts.module.scss'
import TopItemProduct from './topItemProduct';
import Link from 'next/link'
import ABS from '../common/abs';
import { sendTelegramMsg } from '../../API/telegram';

const TopProducts = (props) => {

  if(!props.popular && props.popular.length === 0) return null

  return (
    <div className={stl.sectionContainer}>
      <div className={stl.topTextContainer}>
        <span className={stl.topText}>
          <div><span>Топ </span>покупаемых товаров</div>
          <p>выбери то, что ближе тебе</p>
        </span>
      </div>
      <div className={stl.itemProductContainer}>
        {props.popular.map(item => {
          return <TopItemProduct key={item.id} item={item} />
        })}
      </div>
      <Link href="/products" as={'/products'}><button className={stl.btnBottom}>смотреть все товары</button></Link>
    </div>

  );
}

export default TopProducts