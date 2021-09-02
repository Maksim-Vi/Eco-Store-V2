import React, { useEffect } from 'react'
import DashboardMain from '../../dashboard/DashboardMain'
import TopContainer from '../../dashboard/pages/Top'
import { getCookie } from '../../components/common/session';
import { useDispatch } from 'react-redux';
import { setTop } from '../../redux/reducers/SRM/top/action';
import { setProducts } from '../../redux/reducers/SRM/products/action';
import { checkisVerifyToken } from '../../utility/middlware';

export default function Top({top,products}) {

    const dispatch = useDispatch()
   
    useEffect(() => {
        if(top.length > 0){
            dispatch(setTop(top))
            dispatch(setProducts(products))
        }
    }, [])

    return (
        <DashboardMain title="Dashboard Login">
            <TopContainer />
        </DashboardMain>
    )
}

Top.getInitialProps = async (ctx) => {
    let top = []
    let products = []
    
    let cookie = getCookie('auth', ctx.req)

    if(!cookie){
        ctx.res.writeHead(302, {Location: '/AdminPanel/SignIn'});
        ctx.res.end();
        return;
    } else{

        let isVerify = checkisVerifyToken(cookie)
        if(isVerify === false){
            ctx.res.writeHead(302, {Location: '/AdminPanel/SignIn'});
            ctx.res.end();
            return
        }

        let URL = process.env.SERVER_URL
        const res = await fetch(`${URL}/popular`,{
            headers: {
                'authorization': cookie,
                'isCrm': true
            },
        })
        
        const res2 = await fetch(`${URL}/products`,{
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

        top = await res.json()
        products = await res2.json()
    }
    
    return {
        top: top || [],
        products:products || []
    }
}