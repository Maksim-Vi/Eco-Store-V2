import React from 'react';
import { useDispatch } from 'react-redux';
import HeaderMain from '../components/header/headerMain';
import { setReviewsStore } from '../redux/reducers/reviewsStore-reducer';
import ReviewsContainer from './../components/reviews/Reviews'

const Reviews = ({ reviews }) => {
 
  const dispatch = useDispatch()

  React.useEffect(()=>{
    if(reviews && reviews.length > 0){
      dispatch(setReviewsStore(reviews))
    }
  },[dispatch])


  return (
    <HeaderMain title="Eco Choice promotions">
      <ReviewsContainer reviews={reviews}/>
    </HeaderMain>
  )
}

Reviews.getInitialProps = async () => {
  let URL = process.env.SERVER_URL
  let reviewsStoreJson = []

  let reviewsStore = await fetch(`${URL}/reviews`)

  if (reviewsStore && reviewsStore.status === 200) {
    reviewsStoreJson = await reviewsStore.json()
  }

  return { reviews: reviewsStoreJson }
}

export default Reviews