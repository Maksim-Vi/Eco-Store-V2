

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCookie } from '../../components/common/session'
import DashboardMain from '../../dashboard/DashboardMain'
import ProductsContent from '../../dashboard/pages/Products'
import { setProducts } from '../../redux/reducers/SRM/products/action'
import { setTop } from '../../redux/reducers/SRM/top/action'
import { checkisVerifyToken } from '../../utility/middlware'

const ProductsDashboard = ({products,top}) => {
    
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

ProductsDashboard.getInitialProps = async (ctx) => {
    let products = []
    let top = []

    let cookie = getCookie('auth', ctx.req)

    if(!cookie){
        ctx.res.writeHead(302, {Location: '/AdminPanel/SignIn'});
        ctx.res.end();
        return;
    } else {

        let isVerify = checkisVerifyToken(cookie)
        if(isVerify === false){
            ctx.res.writeHead(302, {Location: '/AdminPanel/SignIn'});
            ctx.res.end();
            return
        }

        let URL = process.env.SERVER_URL
        const res = await fetch(`${URL}/products`,{
            mode: 'no-cors',
            headers: {
                'authorization': cookie,
                'isCrm': true
            },
        })
       
        const res2 = await fetch(`${URL}/populars`,{
            mode: 'no-cors',
            headers: {
                'authorization': cookie,
                'isCrm': true
            },
        })
        
        if(res.status === 500 || res.status === 401 || res2.status === 500 || res2.status === 401){
            ctx.res.writeHead(302, {Location: '/AdminPanel/SignIn'});
            ctx.res.end();
            return;
        }

        top = await res2.json()
        products = await res.json()
    }  
    
    return {
        products:products || [],
        top:top || []
    }
}

export default ProductsDashboard