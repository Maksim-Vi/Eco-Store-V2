import fs from 'fs';

export const deleteAndUpload = (arr,imagesFile) =>{
    debugger
    let images = []
    if(arr.length > 0){
        arr.forEach(img=>{
            if(img.isNew === true){
                try {
                    if(img.url !== undefined){
                        fs.unlinkSync(String(img.url))
                    }
                    if (imagesFile !== undefined) {
                        imagesFile.forEach(file => {
                            images.push(file.path.replace('public/', ''))
                        })
                    }
                } catch (error) {
                    console.log('error: ',error);
                }
            } else {
                if(img.url !== undefined){
                    images.push(img.url)
                } else {
                    images.push(img)
                }
            }
        })
    }

    return images
}