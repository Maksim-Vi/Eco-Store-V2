import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import getPopular from '../API/api';
import ContactUs from '../components/contact/contactUs';
import ProductsLinks from '../components/contectMain/productsLinks';
import TopProducts from '../components/contectMain/topProducts';
import TopProductsSlider from '../components/contectMain/topProductsSlider';
import HeaderMain from '../components/header/headerMain';
import ReviewsSlider from '../components/reviews/ReviewsSlider';
import { setPopular } from '../redux/reducers/popular-reducer';
import { setReviewsStore } from '../redux/reducers/reviewsStore-reducer';
import { setStore } from '../redux/reducers/store-reducer';

const Home = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setStore(props.items))
        dispatch(setPopular(props.popular))
        if(props.reviews && props.reviews.length > 0){
            dispatch(setReviewsStore(props.reviews))
        }
    }, [dispatch])

    return (
        <HeaderMain title="Eco Choice">
            {true &&
                <ProductsLinks />
            }
            {true &&
                <TopProductsSlider popular={props.popular}/>
            }
            {false &&
                <TopProducts popular={props.popular} />
            }
            {true &&
                <ReviewsSlider reviews={props.reviews}/>
            }
            {false &&
                <ContactUs />
            }
        </HeaderMain>)
}

Home.getInitialProps = async () => {
    let URL = process.env.SERVER_URL

    let productsJson = []
    let popularJson = []
    let reviewsStoreJson = []
    
    let products = await fetch(`${URL}/products`)
    let popular = await fetch(`${URL}/populars`)
    let reviewsStore = await fetch(`${URL}/reviews`)
    
    if(products && products.status === 200){
        productsJson = await products.json()
    }
    if(popular && popular.status === 200){
        popularJson = await popular.json()
    }
    if(reviewsStore && reviewsStore.status === 200){
        reviewsStoreJson = await reviewsStore.json()
    }

    return { 
        items: productsJson,
        popular: popularJson,
        reviews: reviewsStoreJson
    }
}

// export const getServerSideProps = async () => {

//     let URL = process.env.SERVER_URL

//     let products = await getAllProducts()
//     let popular = await getAllPopulats()
  
//     return {
//         props: {
//             items: products,
//             popular: popular
//         }
//     };
// };

export default Home