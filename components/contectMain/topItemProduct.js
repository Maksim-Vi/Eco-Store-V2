import React from 'react';
import stl from '../../styles/content/topProducts.module.scss'
import Link from "next/link";

const TopItemProduct = (props) =>{
    let URL = process.env.SERVER_URL
    return (  
        <Link href="/product/[id]" as={`/product/${props.item.id}`} >
            <div className={stl.contentContainer}>
                <div className={stl.itemContent}>
                    <img src={`${process.env.SERVER_UPLOAD_URL}/${props.item.image}`} alt="item popular" />
                    <span><p>{props.item.text}</p></span>
                </div>
            </div>  
        </Link>
       
    )
}

export default TopItemProduct

//http://localhost:5000/uploadsimage/2020-09-09T12-33-21.919ZNabor2.png