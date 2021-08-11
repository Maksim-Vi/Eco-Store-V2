

import React from 'react'
import { getCookie } from '../../components/common/session'
import DashboardMain from '../../dashboard/DashboardMain'
import SettingsContent from '../../dashboard/pages/Settings'

export default function Settings() {
    return (
        <DashboardMain title="Dashboard Login">
            <SettingsContent />
        </DashboardMain>
    )
}

Settings.getInitialProps = async (ctx) => {
   
    let cookie = getCookie('auth', ctx.req)

    if(!cookie){
        ctx.res.writeHead(302, {Location: '/AdminPanel/SignIn'});
        ctx.res.end();
        return;
    }
    
    return {data:{}}
}