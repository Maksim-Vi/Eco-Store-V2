

import React from 'react'
import DashboardMain from '../../dashboard/DashboardMain'
import DashboardContent from '../../dashboard/pages/Dashboard'
import cookies from 'next-cookies'
import cookie from 'js-cookie';
import { getCookie } from '../../components/common/session';

export default function Dashboard() {
    return (
        <DashboardMain title="Dashboard Login">
            <DashboardContent />
        </DashboardMain>
    )
}

Dashboard.getInitialProps = async (ctx) => {
   
    let cookie = getCookie('auth', ctx.req)

    if(!cookie){
        ctx.res.writeHead(302, {Location: '/AdminPanel/SignIn'});
        ctx.res.end();
        return;
    }
    
    return {data:{}}
}