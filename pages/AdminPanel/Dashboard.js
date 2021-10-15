

import React from 'react'
import DashboardMain from '../../dashboard/DashboardMain'
import DashboardContent from '../../dashboard/pages/Dashboard'
import { getCookie } from '../../components/common/session';
import { checkisVerifyToken } from '../../utility/middlware';

const Dashboard = () => {
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
    } else {
        let isVerivy = checkisVerifyToken(cookie)

        if(!isVerivy && ctx){
            ctx.res.writeHead(302, {Location: '/AdminPanel/SignIn'});
            ctx.res.end();
            return; 
        }
    }
     
    return {data:{}}
}

export default Dashboard