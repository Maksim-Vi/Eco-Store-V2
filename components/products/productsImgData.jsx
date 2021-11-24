import React, { useEffect, useState } from 'react'
import s from '../../styles/content/product.module.scss'
import clsx from 'clsx';
import { v4 as uuid } from 'uuid';

const ProductsImgData = (props) => {
    let [ImgDesc, setImgDesc] = useState([])

    let hendlerBuyItem = (item) =>{
        if(props.item.inStock !== false && item.isEnable && item.isEnable !== 'false'){
            let changeItem = {}
            Object.assign(changeItem,  props.item)
            changeItem['isItemfromSlider'] = true
            changeItem['ImgDataId'] = item.id
            changeItem['ImgData'] = ImgDesc
            props.hendlerOpenBuyMenu(changeItem)
        }
    }

    useEffect(() => {
        if(props.item.imagesDescription && props.item.imagesDescription.length > 0){
            let imagesDescription = []
            props.item.imagesDescription.forEach((imgData,index)=>{
                if(props.item.ImgData){
                    let data = {
                        uid: props.item.ImgData[index].uid,
                        id: index,
                        url: imgData.url,
                        imgName: props.item.ImgData[index].imgName,
                        isEnable: props.item.ImgData[index].isEnable
                    }
                    imagesDescription.push(data)
                }
            })
            setImgDesc(imagesDescription)
        }
    }, [])

    return (
        <>
            {ImgDesc.length !== 0 
                ? <div className={s.ListColorItem}>
                   {ImgDesc.map((item, index)=>{
                       return (
                        <div key={index} className={s.colorContainerItem}>
                            <img className={clsx(s.img, { [s.disable]: item.isEnable === 'false'})} src={`${process.env.SERVER_UPLOAD_URL}/${item.url}`} alt="item" onClick={()=>{hendlerBuyItem(item)}}/>
                            <div className={s.textContainer}>
                                <span>{item.imgName}</span>
                            </div>
                            {item.isEnable === 'false' && <span className={s.enable}>нет в наличии</span>}
                        </div> 
                       )
                   })}
                </div>
                : null
            }
        </>
    )
}

export default ProductsImgData
