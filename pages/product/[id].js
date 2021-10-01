import HeaderMain from '../../components/header/headerMain';
import ProductId from '../../components/products/productId';
import constants from '../../components/constants/constants'
import { getDescProductToSeo } from '../../components/common/utilits';
import { getAllProducts, getProductById } from '../../lib/db/DbRequestGet';

const ProductPageId = ({ item }) => {

    console.log(`ANSWER data`, item);
    let id = `ID_100${item.id}`
    let desc = getDescProductToSeo(id)
    let descTitle = item.name

    return (
        <HeaderMain title={descTitle} desc={desc}>
            <ProductId item={item} />
        </HeaderMain>)
}

ProductPageId.getInitialProps = async (ctx) => {
    let URL = process.env.SERVER_URL
    let json = []

    let res = await fetch(`${URL}/product/${ctx.query.id}`)
    json = await res.json()

    if(!json){
        return {
            item: []
        }
    }

    return { item: json }
}

// export const getStaticPaths = async () =>{
//     let products = await getAllProducts()
    
//     return {
//         paths: products.map(item=>{
//             return {
//                 params: {
//                     id: String(item.id)
//                 }
//             }
//         }),
//         fallback: false
//     }
// }

// export const getStaticProps = async (context) => {
//     const id = typeof context.params.id === 'string' ? parseInt(context.params.id, 10) : undefined
//     let product = id ? await getProductById(id) : undefined
     
//     if(!product){
//         return {
//             props: {
//                 item: {},
//             }
//         };
//     }

//     return {
//         props: {
//             item: product,
//         }
//     };
// };

export default ProductPageId