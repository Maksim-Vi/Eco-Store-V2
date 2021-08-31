

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCookie } from '../../components/common/session'
import DashboardMain from '../../dashboard/DashboardMain'
import ProductsContent from '../../dashboard/pages/Products'
import { setProducts } from '../../redux/reducers/SRM/products/action'
import { setTop } from '../../redux/reducers/SRM/top/action'

export default function Products({products,top}) {
    
    const dispatch = useDispatch()
   
    useEffect(() => {
        if(products.length > 0){
            dispatch(setTop(top))
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
    let products = []
    let top = []

    let cookie = getCookie('auth', ctx.req)

    if(!cookie){
        ctx.res.writeHead(302, {Location: '/AdminPanel/SignIn'});
        ctx.res.end();
        return;
    } else {
        let URL = process.env.SERVER_URL
        const res = await fetch(`${URL}/products`,{
            headers: { 'authorization': cookie},
        })
        const res2 = await fetch(`${URL}/popular`,{
            headers: {'authorization': cookie},
        })

        top = await res2.json()
        products = await res.json()
    }  
    
    return {
        products:products,
        top:top
    }
}
