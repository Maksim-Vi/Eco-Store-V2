import { db, sql_query } from "../../../../database_connection";
import { authenticated } from "../../../../utility/middlware";
import NextCors from 'nextjs-cors';

export default authenticated(async function getProductById(req, res) {
    
    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    switch (req.method) {
        case 'GET': {
            let SELECT = ` SELECT p.*, d.*, t.*
                           FROM products AS p
                           LEFT JOIN descriptionproducts AS d ON p.DescProductId = d.id 
                           LEFT JOIN descriptionproductstables AS t ON p.DescProductTableId = t.id 
                           WHERE p.id = ?`
            const response = await sql_query(SELECT, req.query.id)

            let images = []
            let imagesDesc = []

            response.forEach(product => {
                let newData = product
                if(newData.images !== ''){
                    let img = product['images'].split(' , ')
                    let data = []
                    img.forEach(img=>{
                        data.push({
                            url: img,
                            data_url: img,
                            isNew: false
                        })
                    })
                    images = data 
                } 
                if(newData.imagesDescription !== ''){
                    let img = product['imagesDescription'].split(' , ')
                    let data = []
                    img.forEach(img=>{
                        data.push({
                            url: img,
                            data_url: img,
                            isNew: false
                        })
                    })
                    imagesDesc = data                  
                }
            });

            let product = {
                id: response[0].id,
                sale: response[0].sale === 0 ? false : true,
                salePrice: response[0].salePrice,
                name: response[0].name,
                category: response[0].category,
                price: response[0].price,
                images: images,
                inStock: response[0].inStock === 0 ? false : true,
                countInStock: response[0].countInStock,

                nameDescription: response[0].nameDescription,
                description: response[0].description,
                imagesDescription: imagesDesc,
                ImgData: eval("(" +  response[0].ImgData + ")"),
                            
                typeName: response[0].typeName,
                countPeople: response[0].countPeople,
                features: response[0].features,
                eco: response[0].eco,
                equipment: response[0].equipment,
                structure: response[0].structure
            }
            // const id = typeof (req.query.id === 'string' || req.query.id === 'number') ? parseInt(req.query.id, 10) : undefined
            // let product = id ? await getProductById(id) : undefined
            
            if(product){
                res.statusCode = 200
                return res.json(product);
            } else {
                res.statusCode = 404
                return res.json(null);
            }
           
        }
        case 'DELETE': {
            let DELETE = `
            DELETE
                products,
                descriptionproducts,
                descriptionproductstables
            FROM
                products,
                descriptionproducts,
                descriptionproductstables
            WHERE
                products.DescProductId = descriptionproducts.id 
            AND 
                products.DescProductTableId = descriptionproductstables.id 
            AND 
                products.id = ?`

            await db.query(DELETE, [req.query.id])
            await db.end()

            let SELECT = `
            SELECT *, t1.id id 
            FROM products t1 
            LEFT JOIN descriptionproducts t2 ON t1.DescProductId = t2.id 
            LEFT JOIN descriptionproductstables t3 ON t1.DescProductTableId = t3.id`

            const response = await db.query(SELECT)
            await db.end()

            let productsData = []
            response.forEach(product => {
                let newData = product
                if(newData.images !== ''){
                    let images = product['images'].split(' , ')
                    let data = []
                    images.forEach(img=>{
                        data.push({
                            url: img,
                            data_url: img,
                            isNew: false
                        })
                    })
                    newData['images'] = data
                } 
                if(newData.imagesDescription !== ''){
                    let images = product['imagesDescription'].split(' , ')
                    let data = []
                    images.forEach(img=>{
                        data.push({
                            url: img,
                            data_url: img,
                            isNew: false
                        })
                    })
                    newData['imagesDescription'] = data                    
                }
                
                newData['ImgData'] = eval("(" + newData.ImgData + ")")
           
                newData['sale'] = newData.sale === 0 ? false : true
                newData['inStock'] = newData.inStock === 0 ? false : true
               
                productsData.push(newData)
            });

            return res.status(200).json({ messages: 'delete success', products: productsData });
        }
        default: {
            return res.status(500).json({ message: `Sorry but you use ${req.method} request!` })
        }
    }
})