import React, { useContext, useEffect } from 'react'
import DashboardMain from '../../dashboard/DashboardMain'
import TopContainer from '../../dashboard/pages/Top'
import { getCookie } from '../../components/common/session';
import { useDispatch } from 'react-redux';
import { setTop } from '../../redux/reducers/SRM/top/action';
import { setProducts } from '../../redux/reducers/SRM/products/action';
import { checkisVerifyToken } from '../../utility/middlware';
import { AuchContext } from '../../components/common/Context/context.hook';
import { useRouter } from 'next/router';

const TopDashboard = ({top,products,token}) => {

    const dispatch = useDispatch()
    let router = useRouter()
    const auth = useContext(AuchContext)

    useEffect(() => {
        let checkToken = token ? token : getCookie('auth')
        if(!checkisVerifyToken(checkToken)){
            return auth.logout(router)
        }

        if(top.length > 0){
            dispatch(setTop(top))
        }
        if(products.length > 0){
            dispatch(setProducts(products))
        }
    }, [])

    return (
        <DashboardMain title="Dashboard Login">
            <TopContainer top={top} products={products}/>
        </DashboardMain>
    )
}

TopDashboard.getInitialProps = async (ctx) => {
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
            headers: {
                'authorization': cookie,
                'isCrm': true
            },
        })
       
        const res2 = await fetch(`${URL}/populars`,{
            headers: {
                'authorization': cookie,
                'isCrm': true
            },
        })
        
        if(res.status === 200){
            products = await res.json()
        }
        if(res2.status === 200){
            top = await res2.json()
        }
    }  
    
    return {
        products:products,
        top:top,
        token: cookie
    }
}

export default TopDashboard