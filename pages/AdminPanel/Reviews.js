

import React from 'react'
import { getCookie } from '../../components/common/session'
import DashboardMain from '../../dashboard/DashboardMain'
import ReviewsContent from '../../dashboard/pages/Reviews'
import { checkisVerifyToken } from '../../utility/middlware'

const Reviews = () => {
    return (
        <DashboardMain title="Dashboard Reviews">
            <ReviewsContent />
        </DashboardMain>
    )
}

Reviews.getInitialProps = async (ctx) => {
   
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

export default Reviews