import { db } from "../../database_connection";
import { getAllProducts } from "../../lib/db/DbRequestGet";
import { authenticated } from "../../utility/middlware";

export default authenticated(async function getProducts(req, res) {
    switch (req.method) {
        case 'GET': {
            let SELECT = `
            SELECT *, t1.id id 
            FROM products t1 
            LEFT JOIN descriptionproducts t2 ON t1.DescProductId = t2.id 
            LEFT JOIN descriptionproductstables t3 ON t1.DescProductTableId = t3.id`

            const response = await db.query(SELECT)
            await db.end()

            //let response = await getAllProducts()
            
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
            //productsData = response
            return res.json(productsData)
        }
        case 'POST': {
            return res.status(500).json({ message: `Sorry but you use ${req.method} request! in get function` })
        }
        default: {
            return res.status(500).json({ message: `Sorry but you use ${req.method} request!` })
        }
    }
})
