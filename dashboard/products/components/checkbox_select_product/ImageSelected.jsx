import React from 'react'
import ImageUploading from "react-images-uploading";
import { makeStyles, Button } from '@material-ui/core'
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    ContainerAddedItem: {
        display: 'flex',
        alignItems: 'center',
        margin: 5,
    },
    ContainerBtn: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    }
}));

const AddImagesDesc = ({ setImages, onRemoveImagesUrl, setOnRemoveImagesUrl, images }) => {

    const classes = useStyles();
    const [createImages, setCreateImages] = React.useState([]);
    const maxNumber = 8;

    const onChange = (imageList, addUpdateIndex) => {
        let imgData = []
        if(createImages.length > 0  && imageList.length === images.length){
            imageList.forEach((img, index) => {
                if(addUpdateIndex[0] === index){
                    let newDataImg = {
                        url: createImages[addUpdateIndex[0]].url ? createImages[addUpdateIndex[0]].url : '',
                        isNew: true,
                        data_url: img.data_url,
                        file: img.file
                    }
                    imgData.push(newDataImg)
                } else {
                    imgData.push(img)
                }  
            })
        } else {
            imageList.forEach(img => {
                let newDataImg = {}
                if(img.isNew === false){
                    newDataImg = img
                } else {
                    newDataImg = {
                        isNew: true,
                        data_url: img.data_url,
                        file: img.file
                    }
                }
             
                imgData.push(newDataImg)
            })
        }

        setCreateImages(imgData);
        setImages(imgData)
    };

    let onRemove = async (url) =>{
        let checkUrl = url.match(/uploadsImages/i)
        if(checkUrl && String(checkUrl[0]) === 'uploadsImages'){
            setOnRemoveImagesUrl([...onRemoveImagesUrl, url])           
        }
    }

    React.useEffect(()=>{
        if(images.length > 0){
            setCreateImages(images)
        }
    },[])

    return (
        <ImageUploading
            multiple
            value={createImages}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
        >
            {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
            }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                    <Button color="primary" variant="contained"
                        style={isDragging ? { color: 'red' } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                    >
                        Добавить картинку
                    </Button>
                    &nbsp;
                    <Button variant="contained" color="primary" onClick={onImageRemoveAll}>Удалить все картинки</Button>
                    {imageList.map((image, index) => {
                        
                        let img = ''
                        if(image.data_url.split('uploadsImages')[0] === ''){
                            img =  `${process.env.SERVER_UPLOAD_URL}/${image.data_url}`
                        } else {
                            img = image.data_url
                        }

                        return (
                        <div key={index} className={`image-item ${classes.ContainerAddedItem}`}>
                            <img src={img} alt="" width="150" />
                            <div className={`image-item ${classes.ContainerBtn}`}>
                                <Button variant="contained" color="primary" style={{ marginRight: '10px', marginLeft: '10px' }} onClick={() => onImageUpdate(index)}>Изменить</Button>
                                &nbsp;
                                <Button variant="contained" color="primary" onClick={()=>{
                                    onImageRemove(index)
                                    onRemove(image.data_url)
                                }}>Удалить</Button>
                            </div>
                        </div>
                    )})}
                </div>
            )}
        </ImageUploading>
    )
}

export default AddImagesDesc