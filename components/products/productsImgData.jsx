import React, { useEffect, useState } from 'react'
import s from '../../styles/content/product.module.scss'
import clsx from 'clsx';

const ProductsImgData = (props) => {
    let [ImgDesc, setImgDesc] = useState([])

    let hendlerBuyItem = (isEnable) =>{
        if(props.item.inStock !== false && isEnable && isEnable !== 'false'){
            props.hendlerOpenBuyMenu(props.item)
        }
    }

    useEffect(() => {
        if(props.item.imagesDescription && props.item.imagesDescription.length > 0){
            let imagesDescription = []
            props.item.imagesDescription.forEach((imgData,index)=>{
                if(props.item.ImgData){
                    let data = {
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
                            <img className={clsx(s.img, { [s.disable]: item.isEnable === 'false'})} src={`${process.env.SERVER_UPLOAD_URL}/${item.url}`} alt="item" onClick={()=>{hendlerBuyItem(item.isEnable)}}/>
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
