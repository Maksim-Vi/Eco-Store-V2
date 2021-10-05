import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import AddProductTabs from './components/add_product_tabs/AddProductTabs';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setProducts } from '../../redux/reducers/SRM/products/action';
import { getCookie } from '../../components/common/session';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    Toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        marginLeft: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '10px',
        },
    },
}));


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function AddProduct(props) {
    let URL = process.env.SERVER_URL
    const classes = useStyles();

    let Images = useSelector(state => state.CRM_products.Images)
    let genetalTabs = useSelector(state => state.CRM_products.genetalTabs)
    let descriptionProductTabs = useSelector(state => state.CRM_products.descriptionProductTabs)
    let descriptionTableTabs = useSelector(state => state.CRM_products.descriptionTableTabs)
    const dispatch = useDispatch()

    let saveProduct = async () => {
        let cookie = getCookie('auth')

        let images = []
        if (Images.length > 0) {
            Images.forEach(img => {
                let imgData = {
                    isNew: img.isNew,
                    file: img.file
                }
                images.push(imgData)
            })
        }

        let imagesDesc = []
        if (descriptionProductTabs.descriptionImages.length > 0) {
            descriptionProductTabs.descriptionImages.forEach(img => {
                let imgData = {
                    isNew: img.isNew,
                    file: img.file
                }
                imagesDesc.push(imgData)
            })
        }

        let data = {
            id: props.productId,
            DescProductId: genetalTabs.DescProductId,
            DescProductTableId: genetalTabs.DescProductTableId,
            name: genetalTabs.name,
            inStock: genetalTabs.inStock === true ? 1 : 0,
            countInStock: genetalTabs.countInStock,
            category: genetalTabs.category,
            price: genetalTabs.price,
            Images: [],
            sale: genetalTabs.sale === true ? 1 : 0,
            salePrice: genetalTabs.salePrice,

            nameDescription: descriptionProductTabs.nameDescription,
            descriptionD: descriptionProductTabs.descriptionD,
            descriptionImages: [],
            ImgData: descriptionProductTabs.ImgData,

            typeName: descriptionTableTabs.typeName,
            countPeople: descriptionTableTabs.countPeople,
            features: descriptionTableTabs.features,
            eco: descriptionTableTabs.eco,
            equipment: descriptionTableTabs.equipment,
            structure: descriptionTableTabs.structure,
        }

        const formData = new FormData();
        if (images.length > 0) {
            images.forEach((img) => {
                formData.append('images', img.file);
            })
        }

        if (imagesDesc.length > 0) {
            imagesDesc.forEach((img) => {
                formData.append('imagesDesc', img.file);
            })
        }

        await axios.post(`${process.env.SERVER_UPLOAD_URL}/uploadProducts`, formData, {
            headers: {
                'authorization': cookie,
                'Accept': 'application/json',
                'content-type': 'multipart/form-data'
            }
        }).then((response) => {
            if (response.status === 200 && response.data.success === true) {
                data['Images'] = response.data.images
                data['descriptionImages'] = response.data.imagesDesc
            }
        }).catch((err) => {
            console.log(`uploadProducts ERROR AddProduct`, err);
            // props.closeDialog()
            return
        })

        let res = await axios.post(`${URL}/products`, data , {
            headers: { 
                'authorization': cookie,
            }
        }).catch((err) => {
            console.log(`createProduct ERROR AddProduct`, err);
            // props.closeDialog()
            return
        })

        if (res !== undefined && res.status === 200) {
            dispatch(setProducts(res.data.products))
            props.closeDialog()
        }
    }

    return (
        <Dialog fullScreen open={props.open} onClose={() => { props.closeDialog() }} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar className={classes.Toolbar}>
                    <IconButton edge="start" color="inherit" onClick={() => { props.closeDialog() }} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Окно для добавления нового товара
                    </Typography>
                    <Button className={classes.save} autoFocus color="inherit" onClick={() => { saveProduct() }}>
                        Сохранить
                    </Button>
                </Toolbar>
            </AppBar>
            <List>
                <AddProductTabs />
            </List>
        </Dialog>
    );
}
