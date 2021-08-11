import React from 'react'
import { Grid, makeStyles, Tooltip, Typography, TextField, CardContent, Card, Divider, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import { setDescriptionProductTabsData, setImagesProductData } from '../../../../redux/reducers/SRM/products/action';
import AddImagesDesc from '../checkbox_select_product/ImageSelected';

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
    gridContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '30px',
        [theme.breakpoints.down('sm')]: {
            padding: '0px',
        },
    },
    gridColum: {
        display: 'flex',
        flexDirection: 'column',
    },
    fieldDesc: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        }
    }
}));

export const DescriptionProduct = () => {

    const classes = useStyles();

    const dispatch = useDispatch()
    const descriptionProductTabs = useSelector(state => state.CRM_products.descriptionProductTabs)
    const Images = useSelector(state => state.CRM_products.Images)
    let [sendData, setSendData] = React.useState(false);

    let [descriptionProduct, setDescriptionProduct] = React.useState({
        nameDescription: descriptionProductTabs.nameDescription,
        descriptionD: descriptionProductTabs.descriptionD,
    });
    let [images, setImages] = React.useState( Images );

    let handleChange = (event) => {
        setDescriptionProduct({ ...descriptionProduct, [event.target.name]: event.target.value })
    };

    let addDescriptionProductData = () =>{
        setSendData(true)
        dispatch(setImagesProductData(images))
        dispatch(setDescriptionProductTabsData(descriptionProduct))
    }

    React.useEffect(()=>{
        // if(Images.length > 0){
        //     setSendData(true)
        // }
    },[])

    return (
        <>
            <Card className={classes.CardWrapper}>
                <CardContent className={classes.Container}>
                    <Grid className={classes.gridContainer} container spacing={3} wrap="wrap">
                        <Tooltip title="Название товара">
                            <Grid item md={12} sm={12} xs={12}>
                                <Typography color="textPrimary" gutterBottom variant="h6">Название товара (Личная)</Typography>
                                <TextField fullWidth label="Название товара" margin="normal" name="nameDescription"
                                    onChange={handleChange} type="nameDescription" value={descriptionProduct.nameDescription} variant="outlined" />
                            </Grid>
                        </Tooltip>

                        <Tooltip title="описание товара">
                            <Grid item md={12} sm={12} xs={12}>
                                <Typography color="textPrimary" gutterBottom variant="h6">Описание товара</Typography>
                                <TextField className={classes.fieldDesc} fullWidth label="Описание товара" margin="normal" name="descriptionD"
                                    onChange={handleChange} multiline rows={8} type="descriptionD" value={descriptionProduct.descriptionD} variant="outlined" />
                            </Grid>
                        </Tooltip>
                    </Grid>
                </CardContent>
            </Card>
            {sendData 
                ? <Card className={classes.CardWrapper}>
                    <Typography color="textPrimary" gutterBottom variant="h6">Картинки добавлены, поменять можно будет после создания товара</Typography>
                </Card> 
                : <Card className={classes.CardWrapper}>
                <Typography color="textPrimary" gutterBottom variant="h6">Добавить картинки</Typography>
                <AddImagesDesc setImages={setImages} images={images}/>
            </Card>
            }
            <Card className={classes.CardWrapper}>
                <Button color="primary" variant="contained" onClick={addDescriptionProductData}>сохранить изменения</Button>
            </Card>
        </>
    )
}

export default DescriptionProduct

