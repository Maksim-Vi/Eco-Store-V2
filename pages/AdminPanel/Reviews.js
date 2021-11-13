

import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AuchContext } from '../../components/common/Context/context.hook'
import { getCookie } from '../../components/common/session'
import DashboardMain from '../../dashboard/DashboardMain'
import ReviewsContent from '../../dashboard/pages/Reviews'
import { setReviews } from '../../redux/reducers/SRM/reviews/action'
import { checkisVerifyToken } from '../../utility/middlware'

const Reviews = ({reviews,token}) => {

    const dispatch = useDispatch()
    let router = useRouter()
    const auth = useContext(AuchContext)

    useEffect(() => {
        let checkToken = token ? token : getCookie('auth')
        if(!checkisVerifyToken(checkToken)){
            return auth.logout(router)
        }

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
        
        const res = await fetch(`${process.env.SERVER_URL}/reviews`,{
            headers: {
                'authorization': cookie,
                'isCrm': true
            },
        })

        if(res.status === 200){
            reviews = await res.json()
        }
    } 
    
    return {
        reviews: reviews,
        token: cookie
    }
}

export default Reviews