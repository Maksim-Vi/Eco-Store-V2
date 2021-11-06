import { Button, makeStyles } from '@material-ui/core';
import React from 'react'
import ReactImageUploading from 'react-images-uploading';
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    buttonContainer:{
        display: "flex",
        width: '100%'
    },
    button:{
        width: '100%'
    },
    ContainerAddedItem:{
        display: 'flex',
        alignItems: 'center',
        margin: 5,
    },
    ContainerBtn:{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        '& .MuiButtonBase-root':{
            width: '100%',
            margin: 5,
        }
    }
}));

export const SliderAddImage = (props) => {

    const classes = useStyles();
    const [Images, setImages] = React.useState([]);
    const maxNumber = 8;

    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    }

    return (
        <ReactImageUploading
            multiple
            value={Images}
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
                <div className="upload__image-wrapper">
                    <div className={classes.buttonContainer}>
                        <Button className={classes.button} color="primary" variant="contained"
                            style={isDragging ? { color: 'red' } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            Добавить картинку
                        </Button>
                        &nbsp;
                        <Button className={classes.button} variant="contained" color="primary" onClick={onImageRemoveAll}>Удалить все картинки</Button>
                    </div>

                    {imageList.map((image, index) => {
                        console.log(image);
                        return (
                            <div key={index} className={`image-item ${classes.ContainerAddedItem}`}>
                                <img src={image['data_url']} alt="" width="150" />
                                <div className={`image-item ${classes.ContainerBtn}`}>
                                    <Button variant="contained" color="primary" style={{ marginRight: '10px', marginLeft: '10px' }} onClick={() => onImageUpdate(index)}>Изменить</Button>
                                    &nbsp;
                                    <Button variant="contained" color="primary" onClick={() => { onImageRemove(index) }}>Удалить</Button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </ReactImageUploading>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SliderAddImage)
