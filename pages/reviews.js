import React from 'react';
import { useDispatch } from 'react-redux';
import HeaderMain from '../components/header/headerMain';
import { setReviewsStore } from '../redux/reducers/reviewsStore-reducer';
import ReviewsContainer from './../components/reviews/Reviews'
import useSWR from 'swr'

const Reviews = ({reviews}) => {

  const dispatch = useDispatch()
  // const { data: reviews, error } = useSWR(`/api/reviews`, fetcher)

  // if (error) return <div>{error.message}</div>
  // if (!reviews) return <div>Loading...</div>

  React.useEffect(() => {
    if (reviews && reviews.length > 0) {
      dispatch(setReviewsStore(reviews))
    }
  }, [dispatch])

  return (
    <HeaderMain title="Eco Choice promotions">
      <ReviewsContainer reviews={reviews} />
    </HeaderMain>
  )
}

// const fetcher = async (url) => {
//   const data = []
//   const res = await fetch(url)

//   if (res.status !== 200) {
//     throw new Error(data.message)
//   }

//   if (res && res.status === 200) {
//     data = await res.json()
//   }

//   return data
// }

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