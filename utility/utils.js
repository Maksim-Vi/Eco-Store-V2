import fs from 'fs';
import { v4 as uuid } from 'uuid';

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

export const formateProductsData = (response) =>{
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
    return productsData
}

export const formateDataReviews = (reviews) =>{
    let reviewsData = []
    reviews.forEach(review => {
        reviewsData.push({
            id: review.id,
            userName: review.userName, 
            reviewsText: review.reviewsText, 
            reviewsCurrentUrl: review.reviewsCurrentUrl, 
            isShowInMainPage: review.isShowInMainPage === 1 ? true : false, 
            isGoogle: review.isGoogle === 1 ? true : false
        })
    });

    return reviewsData
}

export const formateItamDataBuyDialog = (data) =>{
    let newItamData = {}
    if(data && data.isItemfromSlider && data.isItemfromSlider === true){
        newItamData = { 
            ImgDataId: data.ImgDataId,
            isItemfromSlider: data.isItemfromSlider,
            url: data.imagesDescription[data.ImgDataId].url,
            ImgDesc: data.ImgData
        }
    } else {
        let ImgDesc = []
        if(data.imagesDescription){
            data.imagesDescription.forEach((item,index)=>{
                ImgDesc.push({
                    id: uuid(),
                    uid: index,
                    url: item.url,
                    imgName: data.ImgData[index].imgName,
                    isEnable: data.ImgData[index].isEnable
                })
            })
        }
        newItamData = {
            isItemfromSlider: false,
            url: data.images[0].url,
            ImgDesc: ImgDesc
        }
    }

    newItamData = {...newItamData,
        id: data.id,
        name: data.name,
        price: data.price,
        images: data.images,
        salePrice: data.salePrice,
        equipment: data.equipment,
        countAddItems: 0,
        imagesDescription: data.imagesDescription,
    }

    return newItamData

}
