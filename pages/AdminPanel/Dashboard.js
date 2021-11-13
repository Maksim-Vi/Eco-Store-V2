

import React, { useContext, useEffect } from 'react'
import DashboardMain from '../../dashboard/DashboardMain'
import DashboardContent from '../../dashboard/pages/Dashboard'
import { getCookie } from '../../components/common/session';
import { checkisVerifyToken } from '../../utility/middlware';
import { useRouter } from 'next/router';
import { AuchContext } from '../../components/common/Context/context.hook';

const Dashboard = ({token}) => {

    let router = useRouter()
    const auth = useContext(AuchContext)

    useEffect(() => {
        let checkToken = token ? token : getCookie('auth')
        if(!checkisVerifyToken(checkToken)){
            return auth.logout(router)
        }
    }, [])

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
     
    return {token: cookie}
}

export default Dashboard