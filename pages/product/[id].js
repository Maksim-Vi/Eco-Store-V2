import HeaderMain from '../../components/header/headerMain';
import ProductId from '../../components/products/productId';
import constants from '../../components/constants/constants'
import { getDescProductToSeo } from '../../components/common/utilits';

const ProductPageId = ({item}) => {

    let id = `ID_100${item.id}`
    let desc = getDescProductToSeo(id)
    let descTitle = item.name 
   
    return (
        <HeaderMain title={descTitle} desc={desc}>
            <ProductId item={item}/>
        </HeaderMain>)
}

ProductPageId.getInitialProps = async (ctx) => {
    let URL = process.env.SERVER_URL
    const res = await fetch(`${URL}/product/${ctx.query.id}`)
    const json = await res.json()

    return { item: json }
}

export default ProductPageId