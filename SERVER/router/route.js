const { upload } = require("./multer");
const fs = require("fs");

let uploadData = (req,res) =>{
    let imagesUrl = []
    let imagesDescUrl = []

    if (req.files.images !== undefined) {
        req.files.images.forEach(file => {
            imagesUrl.push(file.path)
        })
    }
    console.log('req files data',req.files);
    if (req.files.imagesDesc !== undefined) {
        req.files.imagesDesc.forEach(file => {
            imagesDescUrl.push(file.path)
        })
    }

    res.status(200).json({success: true, images: imagesUrl, imagesDesc: imagesDescUrl})
}

let updateData = (req,res) =>{
    let body =  typeof req.body.product === "string" ? JSON.parse(req.body.product) : req.body.product;
   
    let images = []
    let imagesDescUrl = []

    if(body.Images.length > 0){
        body.Images.forEach(item=>{
            if(item.isNew === false){
                images.push(item.url)
            } else if(item.isNew === true && item.url && item.url !== ''){
                fs.unlinkSync(String(item.url))
            }
        })
    }
    if (req.files.images !== undefined) {
        req.files.images.forEach(file => {
            images.push(file.path)
        })
    }
    
    if(body.descriptionImages.length > 0){
        body.descriptionImages.forEach(item=>{
            if(item.isNew === false){
                imagesDescUrl.push(item.url)
            } else if(item.isNew === true && item.url && item.url !== ''){
                fs.unlinkSync(String(item.url))
            }
        })
    }
    if (req.files.imagesDesc !== undefined) {
        req.files.imagesDesc.forEach(file => {
            imagesDescUrl.push(file.path)
        })
    }

    // console.log(`RES`, images, imagesDescUrl);
    res.status(200).json({success: true, images: images, imagesDesc: imagesDescUrl })
}

let deleteData = (req,res) =>{
    try{
        if(req.body.url.length > 0){
            req.body.url.forEach(i=>{
                fs.unlinkSync(String(i))
            })
        }
        res.status(200).json({success: true })
    } catch(err){
        res.status(401).json({success: false, err: err})
    }
   
}

module.exports = (app) => {     
    app.post('/uploadImagesProducts', upload.fields([{ name: 'images', maxCount: 10 }, { name: 'imagesDesc', maxCount: 10 }]), uploadData);
    app.put('/uploadImageProduct', upload.fields([{ name: 'images', maxCount: 10 }, { name: 'imagesDesc', maxCount: 10 }]), updateData);
    app.delete('/removeImagesProduct', deleteData);
};