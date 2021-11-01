import React from 'react'
import { makeStyles, CardContent, Card, TextField, Grid, Typography, FormControl, InputLabel, Input } from '@material-ui/core'
import ImageUploading from 'react-images-uploading';
import { Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import { setImagesDescriptionProductData, setNeedToDeleteImages } from '../../../../redux/reducers/SRM/products/action';

const useStyles = makeStyles((theme) => ({
    CardWrapper: {
        margin: '20px',
        marginLeft: '250px',
        marginRight: '250px',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '5px',
            marginRight: '5px',
        },
    },
    ContainerAddedItem: {
        display: 'flex',
        alignItems: 'center',
        margin: 5,
    },
    ContainerBtn:{
        display: 'flex',
        alignItems: 'center',
        flexDirection:'column'
    }
}));


export const AddImages = () => {

    const classes = useStyles();

    const dispatch = useDispatch()
    let descriptionProductTabs = useSelector(state => state.CRM_products.descriptionProductTabs)
    let [desc, setDesc] = React.useState([]);
    let [sendData, setSendData] = React.useState(false);
    const [onRemoveImagesUrl, setOnRemoveImagesUrl] = React.useState([]);
    const [images, setImages] = React.useState([]);
    const maxNumber = 8;

    const onChange = (imageList, addUpdateIndex) => {
        let imgData = []
        let ImgDataDesc = []
        if(images.length > 0 && imageList.length === images.length){
            imageList.forEach((img, index) => {
                if(addUpdateIndex[0] === index){
                    let newDataImg = {
                        url: images[addUpdateIndex[0]].url ? images[addUpdateIndex[0]].url : '',
                        isNew: true,
                        data_url: img.data_url,
                        file: img.file
                    }
                    
                    imgData.push(newDataImg)
                } else {
                    imgData.push(img)
                } 

                ImgDataDesc.push({
                    id: index,
                    imgName:  desc[index] ? desc[index].imgName : "",
                    count: desc[index] ? desc[index].count : ""
                })

            })
        } else {
            imageList.forEach((img,index) => {
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
                
                ImgDataDesc.push({
                    id: index,
                    imgName:  desc[index] ? desc[index].imgName : "",
                    count: desc[index] ? desc[index].count : ""
                })
                
                imgData.push(newDataImg)
            })
        }
        setDesc(ImgDataDesc)
        setImages(imgData)
    };

    let onRemove = (index,url) =>{
        setDesc(desc.map(item => {
            if(item.id !== index ){
                return item
            }
        }))
        let checkUrl = url.match(/uploadsDescImages/i)
        if(checkUrl && String(checkUrl[0]) === 'uploadsDescImages'){
            setOnRemoveImagesUrl([...onRemoveImagesUrl, url])
            // await axios({
            //     method: 'DELETE',
            //     url: `${process.env.SERVER_UPLOAD_URL}/removeImagesProduct`,
            //     data: {url}
            //   })
           
        }
    }

    let setImgDesc = (event,index) =>{
        setDesc(desc.map(item => {
            if(item.id === index ){
                return  {...item, [event.target.name] : event.target.value} 
            } else {
                return item
            }
        }))
    }

    let uploadImages = () =>{
        dispatch(setNeedToDeleteImages(onRemoveImagesUrl))
        dispatch(setImagesDescriptionProductData({
            img: images,
            ImgData: desc,
        }))
    }

    React.useEffect(()=>{
        if(descriptionProductTabs.descriptionImages.length > 0){
            setImages(descriptionProductTabs.descriptionImages)
        }
        if(descriptionProductTabs.ImgData.length > 0){
            setDesc(descriptionProductTabs.ImgData)
        }
    },[])


    return (
        <Card className={classes.CardWrapper}>
            <CardContent className={classes.Container}>
                {sendData
                    ? <Typography color="textPrimary" gutterBottom variant="h6">Картинки добавлены, поменять можно будет после создания товара</Typography>
                    : <ImageUploading
                    multiple
                    value={images}
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
                            &nbsp;
                            <Button variant="contained" color="primary" onClick={uploadImages}>Загрузить картинки</Button>
                            {imageList.map((image, index) => {

                                let img = ''
                                if(image.data_url.split('uploadsDescImages')[0] === ''){
                                    img = `${process.env.SERVER_UPLOAD_URL}/${image.data_url}`
                                } else {
                                    img = image.data_url
                                }

                                return (
                                    <div key={index} className={`image-item ${classes.ContainerAddedItem}`}>
                                        <img src={img} alt="" width="150" />
                                        <div className={`image-item ${classes.ContainerBtn}`}>
                                            <Button variant="contained" color="primary" style={{ marginRight: '10px', marginLeft: '10px' }} onClick={() => onImageUpdate(index)}>Изменить</Button>
                                            &nbsp;
                                            <Button variant="contained" color="primary" onClick={() => {
                                                onImageRemove(index)
                                                onRemove(index,image.data_url)
                                            }}>Удалить</Button>
                                        </div>

                                        <Grid container spacing={3} wrap="wrap">
                                            <Grid item md={3} sm={4} xs={12}>
                                                <TextField fullWidth label="Название" margin="normal" name="imgName"
                                                    onChange={(e) => { setImgDesc(e,index) }} type="imgName" 
                                                    value={desc[index] !== undefined ? desc[index].imgName : ''} 
                                                    variant="outlined" />
                                            </Grid>
                                            <Grid item md={3} sm={4} xs={12}>
                                                <TextField fullWidth label="Количество" margin="normal" name="count"
                                                    onChange={(e) => { setImgDesc(e,index) }} type="count" 
                                                    value={desc[index] !== undefined ? desc[index].count : 0} 
                                                    variant="outlined" />
                                            </Grid>
                                        </Grid>
                                    </div>
                                )})
                            }
                        </div>
                    )}
                </ImageUploading>
                }
            </CardContent>
        </Card>
    )
}

export default AddImages
