import React, { useRef } from 'react';
import { CardHeader, Container, makeStyles } from '@material-ui/core';
import DashboardAddButton from '../utilits/DashboardAddButton';
import ReviewsContainer from '../reviews/ReviewsContainer';
import ReviewsDialog from '../reviews/components/ReviewsDialog';
import { getCookie } from '../../components/common/session';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setReviews } from '../../redux/reducers/SRM/reviews/action';
import { useToasts } from 'react-toast-notifications';

const useStyles = makeStyles((theme) => ({
    Container: {
        [theme.breakpoints.down('md')]: {
            paddingLeft: 0,
            paddingRight: 0
        },
    },
}))

const Reviews = () => {

    const classes = useStyles();
    const dispatch = useDispatch()
    let reviews = useSelector(state => state.CRM_reviews.reviews)

    let [open, setOpen] = React.useState(false)
    const сookieRef = useRef()
    const stateIsEditOrCreateRef = useRef()
    const [ReviewsData, setReviewsData] = React.useState(reviews)
    const [stateReviews, setStateReviews] = React.useState({
        id:'',
        userName: '',
        reviewsText: '',
        reviewsCurrentUrl: '',
        isGoogle: true,
        isShowInMainPage: false
    })
    const { addToast, removeAllToasts } = useToasts()

    let message = (mes) => {
      removeAllToasts()
      addToast(mes, {appearance: 'success',autoDismiss: true })
    }
  
    let error = (mes) => {
      removeAllToasts()
      addToast(mes, { appearance: 'error', autoDismiss: true })
    }

    let openReviewsDialog = () => {
        stateIsEditOrCreateRef.current = 'Create'
        setOpen(true);
    };

    let openEditReviewsDialog = (data) => {
        stateIsEditOrCreateRef.current = 'Edit'
        setStateReviews(data)
        setOpen(true);
    };

    let closeReviewsDialog = () => {
        setOpen(false);
        setStateReviews({
            id:'',
            userName: '',
            reviewsText: '',
            reviewsCurrentUrl: '',
            isGoogle: true,
            isShowInMainPage: false
        })
    };

    let changeStateReviews = (event) => {
        if (event.target.name === 'isShowInMainPage' || event.target.name === 'isGoogle') {
            return setStateReviews({ ...stateReviews, [event.target.name]: event.target.checked })
        }
        setStateReviews({ ...stateReviews, [event.target.name]: event.target.value })
    }

    let saveReviews = async () => {
        let data = {
            id: stateReviews.id,
            userName: stateReviews.userName,
            reviewsText: stateReviews.reviewsText,
            reviewsCurrentUrl: stateReviews.reviewsCurrentUrl,
            isShowInMainPage: stateReviews.isShowInMainPage === true ? 1 : 0,
            isGoogle: stateReviews.isGoogle === true ? 1 : 0
        }

        let res = await axios.post(`${process.env.SERVER_URL}/reviews`, data, {
            headers: {
                'authorization': сookieRef.current,
                'Accept': 'application/json',
            }
        }).then((response) => {
            return response
        }).catch((err) => {
            console.log(`post ERROR reviews`, err);
            return
        })

        if (res && res.status === 200) {
            message('Добавление отзыва прошло удачно! =)')
            dispatch(setReviews(res.data.reviews))
            setReviewsData(res.data.reviews)
            setStateReviews({
                id:'',
                userName: '',
                reviewsText: '',
                reviewsCurrentUrl: '',
                isGoogle: true,
                isShowInMainPage: false
            })
            setOpen(false);
        } else {
            error('Ошибка при добавлении отзыва! =(')
        }
    };

    let deleteReview = async (id) => {
        let data = { deleteId: id }

        let res = await axios({
            method: 'DELETE',
            url: `${process.env.SERVER_URL}/reviews`,
            headers: {
                'authorization': сookieRef.current,
            },
            data: data
        }).catch((err) => {
            console.log(`delete review ERROR Reviews`, err);
        })

        console.log(`ANSWER delete reviews`, res);
        
        if (res && res.status === 200) {
            message('Удаление отзыва прошло удачно! =)')
            dispatch(setReviews(res.data.reviews))
            setReviewsData(res.data.reviews)
            setOpen(false);
        } else {
            error('Ошибка при удалении отзыва! =(')
        }

    }

    let editReview = async () => {
        let data = {
            id: stateReviews.id,
            userName: stateReviews.userName,
            reviewsText: stateReviews.reviewsText,
            reviewsCurrentUrl: stateReviews.reviewsCurrentUrl,
            isShowInMainPage: stateReviews.isShowInMainPage === true ? 1 : 0,
            isGoogle: stateReviews.isGoogle === true ? 1 : 0
        }

        let res = await axios.put(`${process.env.SERVER_URL}/reviews`, data, {
            headers: {
                'authorization': сookieRef.current,
                'Accept': 'application/json',
            }
        }).then((response) => {
            return response
        }).catch((err) => {
            console.log(`post ERROR reviews`, err);
            return
        })

        if (res && res.status === 200) {
            message('Редактирование отзыва прошло удачно! =)')
            dispatch(setReviews(res.data.reviews))
            setReviewsData(res.data.reviews)
            setStateReviews({
                id: '',
                userName: '',
                reviewsText: '',
                reviewsCurrentUrl: '',
                isGoogle: true,
                isShowInMainPage: false
            })
            setOpen(false);
        } else {
            error('Ошибка при редактировании отзыва! =(')
        }
    }

    React.useEffect(() => {
        сookieRef.current = getCookie('auth')
        return () => {
            setStateReviews({
                id:'',
                userName: '',
                reviewsText: '',
                reviewsCurrentUrl: '',
                isGoogle: true,
                isShowInMainPage: false
            })
        }
    }, [])

    React.useEffect(() => {
        if (reviews && reviews.length > 0) {
            setReviewsData(reviews)
        }
    }, [reviews])

    return (
        <Container className={classes.Container} maxWidth="lg">
            <CardHeader subheader="На этой вкладке можно добавить или отредактировать отзывы в CRM" title="Отзывы" />
            <DashboardAddButton openDialog={() => { openReviewsDialog() }} textButton={'Добавить новый отзыв'} />
            <ReviewsContainer reviews={ReviewsData}
                openDialog={() => { openReviewsDialog() }}
                deleteReview={deleteReview}
                openEditReviewsDialog={openEditReviewsDialog} />

            <ReviewsDialog closeReviewsDialog={closeReviewsDialog}
                saveReviews={saveReviews}
                changeStateReviews={changeStateReviews}
                editReview={editReview}
                stateReviews={stateReviews}
                stateIsEditOrCreateRef={stateIsEditOrCreateRef.current}
                open={open} />
        </Container>
    )


};

export default Reviews;
