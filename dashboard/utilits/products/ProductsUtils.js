export const ImagesDeleteDataUrl = (imagesArr) =>{
    let images = []
    imagesArr.forEach(image => {
        if(image.isNew === true){
            let data = {
                url: image.url ? image.url : '',
                file: image.file,
                isNew: true
            }
            images.push(data)
        } else {
            images.push(image)
        }
    });
    return images
}