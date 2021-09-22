import fs from 'fs';

export const deleteAndUpload = (arr,imagesFile) =>{
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

export const deleteImageIfErr = (arr) =>{
    if(arr.length > 0){
        arr.forEach(img=>{
            if(img !== undefined){
                fs.unlinkSync(String(img))
            }
        })
    }
}

export const checkIsHaveDopDesc = (checkId,item,allItemsBasket) =>{
    if(checkId !== ''){
        return countImgData(allItemsBasket, item.ImgDesc.id)
    } else {
        return count(allItemsBasket, item.id)
    }
}

export const count = (item, itemId) => {
    return item.reduce((count, item) => {
        return count + (item.id === itemId ? 1 : 0)
    }, 0)
}

export const countImgData = (item, itemId) => {
    return item.reduce((count, item) => {
        return count + (item.ImgDesc.id === itemId ? 1 : 0)
    }, 0)
}
