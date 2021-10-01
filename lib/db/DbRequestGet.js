// import { db, sql_query } from "../../database_connection"

// export const getAllProducts = async () => {
//     let SELECT = `
//     SELECT *, t1.id id 
//     FROM products t1 
//     LEFT JOIN descriptionproducts t2 ON t1.DescProductId = t2.id 
//     LEFT JOIN descriptionproductstables t3 ON t1.DescProductTableId = t3.id`

//     const response = await db.query(SELECT)
//     await db.end()

//     let productsData = []
//     response.forEach(product => {
//         let newData = product
//         if (newData.images !== '') {
//             let images = product['images'].split(' , ')
//             let data = []
//             images.forEach(img => {
//                 data.push({
//                     url: img,
//                     data_url: img,
//                     isNew: false
//                 })
//             })
//             newData['images'] = data
//         }
//         if (newData.imagesDescription !== '') {
//             let images = product['imagesDescription'].split(' , ')
//             let data = []
//             images.forEach(img => {
//                 data.push({
//                     url: img,
//                     data_url: img,
//                     isNew: false
//                 })
//             })
//             newData['imagesDescription'] = data
//         }

//         newData['ImgData'] = eval("(" + newData.ImgData + ")")

//         newData['sale'] = newData.sale === 0 ? false : true
//         newData['inStock'] = newData.inStock === 0 ? false : true

//         productsData.push(newData)
//     });

//     return productsData.map(({
//         id, sale, salePrice, name, category, price, images, inStock, countInStock, DescProductId, DescProductTableId,
//         nameDescription, description, imagesDescription, ImgData, typeName, countPeople, features, eco, equipment, structure
//     }) => ({
//         id, sale, salePrice, name, category, price, images, inStock, countInStock, DescProductId, DescProductTableId,
//         nameDescription, description, imagesDescription, ImgData, typeName, countPeople, features, eco, equipment, structure
//     }))
// }

// export const getProductById = async (id) => {
//     let SELECT = ` SELECT p.*, d.*, t.*
//                            FROM products AS p
//                            LEFT JOIN descriptionproducts AS d ON p.DescProductId = d.id 
//                            LEFT JOIN descriptionproductstables AS t ON p.DescProductTableId = t.id 
//                            WHERE p.id = ?`
//     const response = await sql_query(SELECT, id)

//     let images = []
//     let imagesDesc = []

//     response.forEach(product => {
//         let newData = product
//         if (newData.images !== '') {
//             let img = product['images'].split(' , ')
//             let data = []
//             img.forEach(img => {
//                 data.push({
//                     url: img,
//                     data_url: img,
//                     isNew: false
//                 })
//             })
//             images = data
//         }
//         if (newData.imagesDescription !== '') {
//             let img = product['imagesDescription'].split(' , ')
//             let data = []
//             img.forEach(img => {
//                 data.push({
//                     url: img,
//                     data_url: img,
//                     isNew: false
//                 })
//             })
//             imagesDesc = data
//         }
//     });

//     let product = {
//         id: response[0].id,
//         sale: response[0].sale === 0 ? false : true,
//         salePrice: response[0].salePrice,
//         name: response[0].name,
//         category: response[0].category,
//         price: response[0].price,
//         images: images,
//         inStock: response[0].inStock === 0 ? false : true,
//         countInStock: response[0].countInStock,

//         nameDescription: response[0].nameDescription,
//         description: response[0].description,
//         imagesDescription: imagesDesc,
//         ImgData: eval("(" + response[0].ImgData + ")"),

//         typeName: response[0].typeName,
//         countPeople: response[0].countPeople,
//         features: response[0].features,
//         eco: response[0].eco,
//         equipment: response[0].equipment,
//         structure: response[0].structure
//     }
    
//     return product
// }

// export const getAllPopulats = async () => {
//     const tops = await sql_query('select * from tops').catch((err) => {
//         res.status(500).json({ message: `popular.js GET req, SELECT desc: Something was wrong! ${err}` })
//     })

//     let data = []
//     tops.forEach(top => {
//         data.push({ id: top.id, text: top.text, image: top.image, isNew: false })
//     });

//     return data
// }