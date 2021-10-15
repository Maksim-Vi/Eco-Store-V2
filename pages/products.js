import { sortItemByType } from '../components/common/utilits';
import HeaderMain from '../components/header/headerMain';
import ProductsContainer from '../components/products/productsContainer';
import { getAllProducts } from '../lib/db/DbRequestGet';

const Products = ({ items }) => {
    return (
        <HeaderMain>
            <ProductsContainer items={sortItemByType(items)}/>
        </HeaderMain>)
}


Products.getInitialProps = async () => {
    let URL = process.env.SERVER_URL
    let json = []
    
    const res = await fetch(`${URL}/products`)

    if(res){
        json = await res.json()
    }
    

    return { items: json }
}

// export const getServerSideProps = async () => {
//     let products = await getAllProducts()
     
//     return {
//         props: {
//             items: products,
//         }
//     };
// };

export default Products