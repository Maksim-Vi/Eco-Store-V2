import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import getPopular  from '../API/api';
import ContactUs from '../components/contact/contactUs';
import TopProducts from '../components/contectMain/topProducts';
import HeaderMain from '../components/header/headerMain';
import { setPopular } from '../redux/reducers/popular-reducer';
import { setStore } from '../redux/reducers/store-reducer';

const Home = ({ items, popular }) => {
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setStore(items))
        dispatch(setPopular(popular))
    }, [dispatch])

    return (
        <HeaderMain title="Eco Choice">
            <TopProducts popular={popular}/>
            <ContactUs />
        </HeaderMain>)
}

Home.getInitialProps = async () => {
    let URL = process.env.SERVER_URL

    let productsJson = []
    let popularJson = []

    let products = await fetch(`${URL}/products`)
    let popular = await fetch(`${URL}/popular`)

    productsJson = await products.json()
    popularJson = await popular.json()

    return { 
        items: productsJson,
        popular: popularJson
    }
}

export default Home