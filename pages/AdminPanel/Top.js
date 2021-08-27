import React from 'react'
import DashboardMain from '../../dashboard/DashboardMain'
import TopContainer from '../../dashboard/pages/Top'
import { getCookie } from '../../components/common/session';

export default function Top() {
    return (
        <DashboardMain title="Dashboard Login">
            <TopContainer />
        </DashboardMain>
    )
}

Top.getInitialProps = async (ctx) => {
   
    let cookie = getCookie('auth', ctx.req)

    if(!cookie){
        ctx.res.writeHead(302, {Location: '/AdminPanel/SignIn'});
        ctx.res.end();
        return;
    }
    
    return {data:{}}
}