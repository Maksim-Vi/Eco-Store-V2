import React from 'react';
import { CardHeader, Container } from '@material-ui/core';
import DashboardAddButton from '../utilits/DashboardAddButton';
import ReviewsContainer from '../reviews/ReviewsContainer';
import ReviewsDialog from '../reviews/components/ReviewsDialog';

const Reviews = () => {

    let [open, setOpen] = React.useState(false)
    const [stateReviews, setStateReviews] = React.useState({
        userName: '',
        reviewsText: '',
        reviewsCurrentUrl: '',
        isGoogle: true,
        isShowInMainPage: false
    })

    let openReviewsDialog = () => {
        setOpen(true);
    };

    let closeReviewsDialog = () => {
        setOpen(false);
    };

    let saveReviews = () => {
        setOpen(false);
    };

    let changeStateReviews = (event) =>{
        if(event.target.name === 'isShowInMainPage' || event.target.name === 'isGoogle'){
            return  setStateReviews({...stateReviews, [event.target.name]: event.target.checked }) 
        }
        setStateReviews({...stateReviews, [event.target.name]: event.target.value})
    }

    return (
        <Container maxWidth="lg">
            <CardHeader subheader="На этой вкладке можно добавить или отредактировать отзывы в CRM" title="Отзывы" />
            <DashboardAddButton openDialog={() => { openReviewsDialog() }} textButton={'Добавить новый отзыв'} />
            <ReviewsContainer />

            <ReviewsDialog  closeReviewsDialog={closeReviewsDialog}
                            saveReviews={saveReviews} 
                            changeStateReviews={changeStateReviews} 
                            stateReviews={stateReviews}
                            open={open}/>
        </Container>
    )


};

export default Reviews;
