

import React from 'react'
import { getCookie } from '../../components/common/session'
import DashboardMain from '../../dashboard/DashboardMain'
import SettingsContent from '../../dashboard/pages/Account'
import { checkisVerifyToken } from '../../utility/middlware'

const Account = () => {
    return (
        <DashboardMain title="Dashboard Login">
            <SettingsContent />
        </DashboardMain>
    )
}

Account.getInitialProps = async (ctx) => {
   
    let cookie = getCookie('auth', ctx.req)

    if(!cookie){
        ctx.res.writeHead(302, {Location: '/AdminPanel/SignIn'});
        ctx.res.end();
        return;
    } else {
        let isVerivy = checkisVerifyToken(cookie)

        if(!isVerivy){
            ctx.res.writeHead(302, {Location: '/AdminPanel/SignIn'});
            ctx.res.end();
            return; 
        }
    }

   
    
    
    return {data:{}}
}

export default Account