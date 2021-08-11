

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCookie } from '../../components/common/session'
import DashboardMain from '../../dashboard/DashboardMain'
import ProductsContent from '../../dashboard/pages/Products'
import { setProducts } from '../../redux/reducers/SRM/products/action'

export default function Products({products}) {
    
    const dispatch = useDispatch()
   
    useEffect(() => {
        if(products.length > 0){
            dispatch(setProducts(products))
        }
    }, [])
    
    return (
        <DashboardMain title="Dashboard Login">
            <ProductsContent />
        </DashboardMain>
    )
}

Products.getInitialProps = async (ctx) => {
   
    let cookie = getCookie('auth', ctx.req)
    let products = []

    if(!cookie){
        ctx.res.writeHead(302, {Location: '/AdminPanel/SignIn'});
        ctx.res.end();
        return;
    } else {
        let URL = process.env.SERVER_URL
        const res = await fetch(`${URL}/products`,{
            headers: { 'authorization': cookie},
        })
        products = await res.json()
    }
    
    return {products:products}
}
