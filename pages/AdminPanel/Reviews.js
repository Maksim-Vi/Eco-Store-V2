

import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCookie } from '../../components/common/session'
import DashboardMain from '../../dashboard/DashboardMain'
import ReviewsContent from '../../dashboard/pages/Reviews'
import { setReviews } from '../../redux/reducers/SRM/reviews/action'
import { checkisVerifyToken } from '../../utility/middlware'

const Reviews = ({reviews}) => {

    const dispatch = useDispatch()
   
    useEffect(() => {
        if(reviews.length > 0){
            dispatch(setReviews(reviews))
        }
    }, [])

    return (
        <DashboardMain title="Dashboard Reviews">
            <ReviewsContent />
        </DashboardMain>
    )
}

Reviews.getInitialProps = async (ctx) => {
    
    let cookie = getCookie('auth', ctx.req)
    let reviews = []

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

        const res = await fetch(`${process.env.SERVER_URL}/reviews`,{
            headers: {
                'authorization': cookie,
                'isCrm': true
            },
        })

        if(res.status === 500 || res.status === 401){
            return { reviews: [] };
        }

        reviews = await res.json()
        
    } 
    
    return {reviews: reviews}
}

export default Reviews