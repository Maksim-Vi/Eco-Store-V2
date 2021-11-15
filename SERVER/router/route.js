const { upload } = require("./multer");
const fs = require("fs");
const { form, formStore } = require("./nodemailer");

let uploadData = (req,res) =>{
    let imagesUrl = []
    let imagesDescUrl = []

    if (req.files.images !== undefined) {
        req.files.images.forEach(file => {
            imagesUrl.push(file.path)
        })
    }
    
    if (req.files.imagesDesc !== undefined) {
        req.files.imagesDesc.forEach(file => {
            imagesDescUrl.push(file.path)
        })
    }
    
    if(imagesUrl.length > 0 || imagesDescUrl.length > 0){
        return res.status(200).json({success: true, images: imagesUrl, imagesDesc: imagesDescUrl })
    } else {
        return res.status(401).json({success: false, images: [], imagesDesc: [] })
    }
}

let updateData = (req,res, next) =>{
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

    if(images.length > 0 || imagesDescUrl.length > 0){
        return res.status(200).json({success: true, images: images, imagesDesc: imagesDescUrl })
    } else {
        return res.status(400).json({success: false, images: [], imagesDesc: [] })
    }
}

let deleteData = (req,res) =>{
    if(req.body.url.length > 0){
        req.body.url.forEach(i=>{
            fs.unlinkSync(String(i))
        })
    }
    return res.status(200).json({success: true })
}


module.exports = (app) => {     
    app.post('/uploadImagesProducts', upload.fields([{ name: 'images', maxCount: 30 }, { name: 'imagesDesc', maxCount: 30 }]), uploadData);
    app.put('/uploadImageProduct', upload.fields([{ name: 'images', maxCount: 30 }, { name: 'imagesDesc', maxCount: 30 }]), updateData);
    app.delete('/removeImagesProduct', deleteData);

    app.post('/contactForm',form);
    app.post('/contactFormOrder',formStore);
};