import React, { useEffect } from 'react'
import DashboardMain from '../../dashboard/DashboardMain'
import TopContainer from '../../dashboard/pages/Top'
import { getCookie } from '../../components/common/session';
import { useDispatch } from 'react-redux';
import { setTop } from '../../redux/reducers/SRM/top/action';
import { setProducts } from '../../redux/reducers/SRM/products/action';

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
        let URL = process.env.SERVER_URL
        const res = await fetch(`${URL}/popular`,{
            headers: {'authorization': cookie},
        })
        
        const res2 = await fetch(`${URL}/products`,{
            headers: { 'authorization': cookie},
        })

        top = await res.json()
        products = await res2.json()
    }
    
    return {
        top: top || [],
        products:products || []
    }
}