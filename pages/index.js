import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import getPopular from '../API/api';
import ContactUs from '../components/contact/contactUs';
import ProductsLinks from '../components/contectMain/productsLinks';
import TopProducts from '../components/contectMain/topProducts';
import TopProductsSlider from '../components/contectMain/topProductsSlider';
import HeaderMain from '../components/header/headerMain';
import { setPopular } from '../redux/reducers/popular-reducer';
import { setStore } from '../redux/reducers/store-reducer';

const Home = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setStore(props.items))
        dispatch(setPopular(props.popular))
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
            { true &&
                <ContactUs />
            }
        </HeaderMain>)
}

Home.getInitialProps = async () => {
    let URL = process.env.SERVER_URL

    let productsJson = []
    let popularJson = []

    let products = await fetch(`${URL}/products`)
    let popular = await fetch(`${URL}/populars`)

    if(products.status === 200){
        productsJson = await products.json()
    }
    if(popular.status === 200){
        popularJson = await popular.json()
    }
   
    return { 
        items: productsJson,
        popular: popularJson
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