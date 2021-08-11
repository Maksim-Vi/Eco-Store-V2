import { sortItemByType } from '../components/common/utilits';
import HeaderMain from '../components/header/headerMain';
import ProductsContainer from '../components/products/productsContainer';


const Products = ({ items }) => {
    return (
        <HeaderMain>
            <ProductsContainer items={sortItemByType(items)}/>
        </HeaderMain>)
}


Products.getInitialProps = async () => {
    let URL = process.env.SERVER_URL

    const res = await fetch(`${URL}/products`)
    const json = await res.json()
    return { items: json }
}

export default Products