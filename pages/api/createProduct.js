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
});

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

// apiRoute.use(upload.array('images'))
apiRoute.use(upload.fields([{ name: 'images', maxCount: 10 }, { name: 'imagesDesc', maxCount: 10 }]))

apiRoute.put((req, res) => {
    let body = JSON.parse(req.body.product)

    let imagesUrl = []
    let imagesDescUrl = []

    let imgUrl = deleteAndUpload(body.Images, req.files.images)
    let imgDescUrl = deleteAndUpload(body.descriptionImages, req.files.imagesDesc)

    imagesUrl = imgUrl
    imagesDescUrl = imgDescUrl

    // added db data to update product

    // console.log('ANSWER ', imagesUrl);
    // console.log('ANSWER ', imagesDescUrl);

    // logic update product
    res.status(200).json({ data: 'success put', body: body });
});

apiRoute.post(async (req, res) => {
    let body = JSON.parse(req.body.product)

    let imagesUrl = []
    let imagesDescUrl = []

    if (req.files.images !== undefined) {
        req.files.images.forEach(file => {
            imagesUrl.push(file.path.replace('public/', ''))
        })
    }

    if (req.files.imagesDesc !== undefined) {
        req.files.imagesDesc.forEach(file => {
            imagesDescUrl.push(file.path.replace('public/', ''))
        })
    }

    let INSERT_PRODUCTS = `INSERT INTO products(sale, salePrice, name, category, price, images, inStock, countInStock, DescProductId, DescProductTableId) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    let INSERT_DESC = `INSERT INTO descriptionproducts(nameDescription, description, imagesDescription,ImgData)  VALUES(?, ?, ?, ?)`
    let INSERT_DESC_TABLE = `INSERT INTO descriptionproductstables(typeName, countPeople, features, eco, equipment, structure)  VALUES(?, ?, ?, ?, ?, ?)`

    const descProduct = await sql_query(INSERT_DESC, [
        body.nameDescription,
        body.descriptionD,
        imagesDescUrl.length === 0 ? '' : imagesUrl.join(' , '),
        body.ImgData,
    ])

    const descProductTable = await sql_query(INSERT_DESC_TABLE, [
        body.typeName,
        body.countPeople,
        body.features,
        body.eco,
        body.equipment,
        body.structure
    ])

    if (descProduct.insertId > 0 && descProductTable.insertId > 0) {
        await sql_query(INSERT_PRODUCTS, [
            body.sale,
            body.salePrice,
            body.name,
            body.category,
            body.price,
            imagesUrl.length === 0 ? '' : imagesUrl.join(' , '),
            body.inStock,
            body.countInStock,
            descProduct.insertId,
            descProductTable.insertId,
        ])

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
            if (newData.images !== '') {
                let images = product['images'].split(' , ')
                newData['images'] = images
            } 
            if (newData.imagesDescription !== '') {
                let images = product['imagesDescription'].split(' , ')
                newData['imagesDescription'] = images
            }

            newData['sale'] = newData.sale === 0 ? false : true
            newData['inStock'] = newData.inStock === 0 ? false : true
            
            productsData.push(newData)
        });

        res.status(200).json({ messages: 'success', products: productsData });
    } else {
        res.status(500).json({ message: `something is wrong!` })
    }
});

export default authenticated(apiRoute);

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};