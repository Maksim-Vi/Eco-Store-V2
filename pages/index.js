import { useEffect, useState } from 'react';
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
import { setSettingsStore } from '../redux/reducers/settingsStore-redicer';
import { setStore } from '../redux/reducers/store-reducer';

const Home = (props) => {

    const dispatch = useDispatch()
    let [settings, setSettings] = useState({})


    let pushDataLocal = (settings) =>{
        setSettings({
          isShowNavSlider: settings.isShowNavSlider ? settings.isShowNavSlider : true,
          isShowTopSlider: settings.isShowTopSlider ? settings.isShowTopSlider : true,
          isShowTopGrid: settings.isShowTopGrid ? settings.isShowTopGrid : false,
          isShowReviews: settings.isShowReviews ? settings.isShowReviews : true,
          isShowContactUs: settings.isShowContactUs ? settings.isShowContactUs : false,
          isShowAdvertisingSlider: settings.isShowAdvertisingSlider ? settings.isShowAdvertisingSlider : true,
        })
      }

    useEffect(() => {
        dispatch(setStore(props.items))
        dispatch(setPopular(props.popular))
        if(props.reviews && props.reviews.length > 0){
            dispatch(setReviewsStore(props.reviews))
        }
        if(props.settings){
            dispatch(setSettingsStore(props.settings))
            pushDataLocal(props.settings)
        }
    }, [dispatch])

    if(!settings) return <HeaderMain title="Eco Choice"></HeaderMain>

    return (
        <HeaderMain title="Eco Choice">
            {settings.isShowNavSlider &&
                <ProductsLinks />
            }
            {settings.isShowTopSlider &&
                <TopProductsSlider popular={props.popular}/>
            }
            {settings.isShowTopGrid &&
                <TopProducts popular={props.popular} />
            }
            {settings.isShowReviews &&
                <ReviewsSlider reviews={props.reviews}/>
            }
            {settings.isShowContactUs &&
                <ContactUs />
            }
        </HeaderMain>)
}

Home.getInitialProps = async () => {
    let URL = process.env.SERVER_URL

    let productsJson = []
    let popularJson = []
    let reviewsStoreJson = []
    let settingsJson = {}

    let products = await fetch(`${URL}/products`)
    let popular = await fetch(`${URL}/populars`)
    let reviewsStore = await fetch(`${URL}/reviews`)
    let settings = await fetch(`${URL}/settings`)
    
    if(products && products.status === 200){
        productsJson = await products.json()
    }
    if(popular && popular.status === 200){
        popularJson = await popular.json()
    }
    if(reviewsStore && reviewsStore.status === 200){
        reviewsStoreJson = await reviewsStore.json()
    }
    if(settings && settings.status === 200){
        settingsJson = await settings.json()
    }

    return { 
        items: productsJson,
        popular: popularJson,
        reviews: reviewsStoreJson,
        settings: settingsJson.settings
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