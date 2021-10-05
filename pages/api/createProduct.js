import nextConnect from 'next-connect';
import multer from 'multer';
import { db, sql_query } from '../../database_connection';
import { authenticated } from '../../utility/middlware';
import { deleteAndUpload } from '../../utility/utils';

const upload = multer({
    storage: multer.diskStorage({
        // destination: './public/api/uploads_v2.0',
        destination: function (req, file, cb) {
            if (file.fieldname === 'images') {
                cb(null, './public/api/uploadsImages')
            } else if (file.fieldname === 'imagesDesc') {
                cb(null, './public/api/uploadsDescImages')
            }
        },
        filename: function (req, file, cb) {
            cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
        }
    }),
    limits: {
        fileSize: 1025 * 1025 * 6
    },
});

const apiRoute = nextConnect({
    onError(error, req, res) {
        return res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

// apiRoute.use(upload.fields([{ name: 'images', maxCount: 10 }, { name: 'imagesDesc', maxCount: 10 }]))

apiRoute.put(async (req, res) => {
    let body = JSON.parse(req.body.product)
    let ImgData = JSON.stringify(body.ImgData)

    let imgUrl = deleteAndUpload(body.Images, req.files.images)
    let imgDescUrl = deleteAndUpload(body.descriptionImages, req.files.imagesDesc)
       
    let UPDATE_DESC = 'UPDATE descriptionproducts SET nameDescription = ?, description = ?, imagesDescription = ?, ImgData = ? WHERE id = ?'
    await sql_query(UPDATE_DESC,[
        body.nameDescription, 
        body.descriptionD, 
        imgDescUrl.length === 0 ? '' : imgDescUrl.join(' , '), 
        ImgData,
        body.DescProductId
    ]).catch((err)=>{
        res.status(500).json({ message: `createProduct.js PUT req, UPDATE desc: Something was wrong! ${err}` })
    })
    
    let UPDATE_DESC_TABLE = 'UPDATE descriptionproductstables SET typeName = ?, countPeople = ?, features = ?, eco = ?, equipment = ?, structure = ? WHERE id = ?'
    await sql_query(UPDATE_DESC_TABLE, [
        body.typeName,
        body.countPeople,
        body.features,
        body.eco,
        body.equipment,
        body.structure,
        body.DescProductTableId
    ]).catch((err)=>{
        res.status(500).json({ message: `createProduct.js PUT req, UPDATE descTabs: Something was wrong! ${err}` })
    })


    let UPDATE_PRODUCTS = 'UPDATE products SET sale = ?, salePrice = ?, name = ?, category = ?, price = ?, images = ?, inStock = ?, countInStock = ? WHERE id = ?'  
    await sql_query(UPDATE_PRODUCTS, [
        body.sale, 
        body.salePrice, 
        body.name, 
        body.category, 
        body.price, 
        imgUrl.length === 0 ? '' : imgUrl.join(' , '), 
        body.inStock, 
        body.countInStock, 
        body.id
    ]).catch((err)=>{
        res.status(500).json({ message: `createProduct.js PUT req, UPDATE products: Something was wrong! ${err}` })
    })

    let SELECT = `
        SELECT *, t1.id id 
        FROM products t1 
        LEFT JOIN descriptionproducts t2 ON t1.DescProductId = t2.id 
        LEFT JOIN descriptionproductstables t3 ON t1.DescProductTableId = t3.id`

    const response = await db.query(SELECT).catch((err)=>{
        res.status(500).json({ message: `createProduct.js PUT req, SELECT products: Something was wrong! ${err}` })
    })
    await db.end()

    let productsData = []
    response.forEach(product => {
        let newData = product
        if (newData.images !== '') {
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
        if (newData.imagesDescription !== '') {
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

    res.status(200).json({ messages: 'success', products: productsData });     
});

apiRoute.post(async (req, res) => {
    let body = JSON.parse(req.product)
    let ImgData = JSON.stringify(body.ImgData)

    console.log(`ANSWER`, body,ImgData);
   
    // let body = JSON.parse(req.body.product)
    // let ImgData = JSON.stringify(body.ImgData)

    // let INSERT_PRODUCTS = `INSERT INTO products(sale, salePrice, name, category, price, images, inStock, countInStock, DescProductId, DescProductTableId) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    // let INSERT_DESC = `INSERT INTO descriptionproducts(nameDescription, description, imagesDescription,ImgData)  VALUES(?, ?, ?, ?)`
    // let INSERT_DESC_TABLE = `INSERT INTO descriptionproductstables(typeName, countPeople, features, eco, equipment, structure)  VALUES(?, ?, ?, ?, ?, ?)`

    // const descProduct = await sql_query(INSERT_DESC, [
    //     body.nameDescription,
    //     body.descriptionD,
    //     // imagesDescUrl.length === 0 ? '' : imagesDescUrl.join(' , '),
    //     body.descriptionImages.length === 0 ? '' : imagesDescUrl.join(' , '),
    //     ImgData,
    // ]).catch((err)=>{
    //     res.status(500).json({ message: `createProduct.js POST req, INSERT desc: Something was wrong! ${err}` })
    // })
    
    // const descProductTable = await sql_query(INSERT_DESC_TABLE, [
    //     body.typeName,
    //     body.countPeople,
    //     body.features,
    //     body.eco,
    //     body.equipment,
    //     body.structure
    // ]).catch((err)=>{
    //     res.status(500).json({ message: `createProduct.js POST req, INSERT descTabs: Something was wrong! ${err}` })
    // })

    // if (descProduct.insertId > 0 && descProductTable.insertId > 0) {
    //     await sql_query(INSERT_PRODUCTS, [
    //         body.sale,
    //         body.salePrice,
    //         body.name,
    //         body.category,
    //         body.price,
    //         // imagesUrl.length === 0 ? '' : imagesUrl.join(' , '),
    //         body.Images.length === 0 ? '' : imagesUrl.join(' , '),
    //         body.inStock,
    //         body.countInStock,
    //         descProduct.insertId,
    //         descProductTable.insertId,
    //     ]).catch((err)=>{
    //         res.status(500).json({ message: `createProduct.js POST req, INSERT products: Something was wrong! ${err}` })
    //     })

    //     let SELECT = `
    //         SELECT *, t1.id id 
    //         FROM products t1 
    //         LEFT JOIN descriptionproducts t2 ON t1.DescProductId = t2.id 
    //         LEFT JOIN descriptionproductstables t3 ON t1.DescProductTableId = t3.id`

    //     const response = await db.query(SELECT).catch((err)=>{
    //         res.status(500).json({ message: `createProduct.js POST req, SELECT products: Something was wrong! ${err}` })
    //     })
    //     await db.end()

    //     let productsData = []
    //     response.forEach(product => {
    //         let newData = product
    //         if (newData.images !== '') {
    //             let images = product['images'].split(' , ')
    //             let data = []
    //             images.forEach(img=>{
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
    //             images.forEach(img=>{
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

    //     res.status(200).json({ messages: 'success', products: productsData });
    // } 
});

export default authenticated(apiRoute);

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};