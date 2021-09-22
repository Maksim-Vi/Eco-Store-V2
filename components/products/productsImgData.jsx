import React, { useEffect, useState } from 'react'
import s from '../../styles/content/product.module.scss'

const ProductsImgData = (props) => {
    let [ImgDesc, setImgDesc] = useState([])

    let hendlerBuyItem = () =>{
        if(props.item.inStock !== false){
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
                        count: props.item.ImgData[index].count
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
                            <img className={s.img} src={`${item.url.split('public')[1]}`} alt="item" onClick={()=>{hendlerBuyItem()}}/>
                            <div className={s.textContainer}>
                                <span>{item.imgName}</span>
                                <span>{item.count} шт</span>
                            </div>
                           
                        </div> 
                       )
                   })}
                    {/* <div className={s.colorContainerItem}>
                        <div className={s.active} style={{ backgroundColor: 'red', border: '1px solid #800000' }}></div>
                        <span>red</span>
                    </div>
                    <div className={s.colorContainerItem}>
                        <div style={{ backgroundColor: 'yellow', border: '1px solid #FFA500' }}></div>
                        <span>yellow</span>
                    </div>
                    <div className={s.colorContainerItem}>
                        <div style={{ backgroundColor: 'white', border: '1px solid black' }}></div>
                        <span>white</span>
                    </div>
                    <div className={s.colorContainerItem}>
                        <div style={{ backgroundColor: 'green', border: '1px solid #008000' }}></div>
                        <span>green</span>
                    </div>
                    <div className={s.colorContainerItem}>
                        <div style={{ backgroundColor: 'blue', border: '1px solid #00008B' }}></div>
                        <span>blue</span>
                    </div> */}
                </div>
                : null
            }
        </>
    )
}

export default ProductsImgData