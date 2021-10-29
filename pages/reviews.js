import React from 'react';
import HeaderMain from '../components/header/headerMain';
import ReviewsContainer from './../components/reviews/Reviews'

const Reviews = () =>{
    return (
        <HeaderMain title="Eco Choice promotions">
          <ReviewsContainer />
        </HeaderMain>
    )
}

Reviews.getInitialProps = async () => {
  let URL = process.env.SERVER_URL
  let json = []
  
  const res = await fetch(`${URL}/reviews`)

  if(res){
      json = await res.json()
  }
  
  return { items: json }
}

export default Reviews