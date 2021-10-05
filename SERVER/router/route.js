const { upload } = require("./multer");
const fs = require("fs");

const uploadData = (req,res) =>{
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

const updateImages = (req,res) =>{
    const body = JSON.parse(req.body.product);  
    try{
        let images = []
        let imagesDescUrl = []  

        console.log(`ANSVER arr`,body);

        images = updateImagesData(body.Images,req.files.images)
        imagesDescUrl = updateImagesData(body.descriptionImages,req.files.imagesDesc)
        
        res.status(200).json({success: true, images: images, imagesDesc: imagesDescUrl })
    } catch(err){
        res.status(404).json({success: false, err: err})
    }
}

const updateImagesData = (arr,files) =>{
    let images = []
    console.log(`ANSVER arr`,arr);
    if(arr.length > 0){
        arr.forEach(img=>{
            console.log(`ANSVER img`);
            if(img.isNew === true){
                console.log(`isNew true`);
                if(img.url !== undefined){
                    console.log(`isNew url`, img.url);
                    fs.unlinkSync(String(img.url))
                }
                if (files !== undefined) {
                    console.log(`isNew files`,file.path);
                    files.forEach(file => {
                        images.push(file.path)
                    })
                }
            } else {
                console.log(`isNew false`);
                if(img.url !== undefined){
                    images.push(img.url)
                } else {
                    images.push(img)
                }
            }
        })
    }
    console.log(`isNew false`, images);
    return images
}

module.exports = (app) => {     
    app.post('/uploadProducts', upload.fields([{ name: 'images', maxCount: 10 }, { name: 'imagesDesc', maxCount: 10 }]), uploadData);
    app.put('/uploadProductById', upload.fields([{ name: 'images', maxCount: 10 }, { name: 'imagesDesc', maxCount: 10 }]), updateImages);
};