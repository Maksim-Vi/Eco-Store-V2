import React, { useContext } from 'react';
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
import EditProductTabs from './components/edit_product_tabs/EditProductTabs';
import classNames from 'classnames';
import axios from 'axios';
import { getCookie } from '../../components/common/session';
import { useDispatch, useSelector } from 'react-redux';
import { editProductTabs, resetNeedToDeleteImages, resetProductTabs, setProducts } from '../../redux/reducers/SRM/products/action';
import { ImagesDeleteDataUrl } from '../utilits/products/ProductsUtils';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import { AuchContext } from '../../components/common/Context/context.hook';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    Toolbar: {
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'space-between',
    },
    topBarLeft: {
        [theme.breakpoints.down('md')]: {
            fontSize: '14px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '10px',
        },
    },
    title: {
        marginLeft: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            fontSize: '14px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '10px',
        },
    },
    delete: {
        marginLeft: 'auto',
        marginRight: 20
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditProduct(props) {
    const classes = useStyles();
    let URL = process.env.SERVER_URL
    let products = useSelector(state => state.CRM_products.products)
    let router = useRouter()
    const auch = useContext(AuchContext)

    let Images = useSelector(state => state.CRM_products.Images)
    let genetalTabs = useSelector(state => state.CRM_products.genetalTabs)
    let descriptionProductTabs = useSelector(state => state.CRM_products.descriptionProductTabs)
    let descriptionTableTabs = useSelector(state => state.CRM_products.descriptionTableTabs)
    const needToDeleteImages = useSelector(state => state.CRM_products.needToDeleteImages)

    const dispatch = useDispatch()
    const { addToast, removeAllToasts } = useToasts()

    let message = (mes) => {
        removeAllToasts()
        addToast(mes, { appearance: 'success', autoDismiss: true })
    }

    let error = (mes) => {
        removeAllToasts()
        addToast(mes, { appearance: 'error', autoDismiss: true })
    }

    let deleteProduct = async () => {
        let cookie = getCookie('auth')

        let url = []
        if (Images.length > 0) {
            Images.forEach(img => {
                if (img.url) {
                    url.push(img.url)
                }
            })
        }

        if (descriptionProductTabs.descriptionImages.length > 0) {
            descriptionProductTabs.descriptionImages.forEach(img => {
                if (img.url) {
                    url.push(img.url)
                }
            })
        }

        if(url.length > 0){
            await axios({
                method: 'DELETE',
                url: `${process.env.SERVER_UPLOAD_URL}/removeImagesProduct`,
                data: { url }
            }).catch((err) => {
                console.log(`delete images ERROR EditProduct`, err);
                error('Crit Error, EditProduct При удалении товара что то пошло не так!')
                return
            })
        }
       
        let res = await axios.delete(`${URL}/product/${props.productId}`, {
            headers: { 'authorization': cookie }
        })

        if (res.status === 200) {
            if(res.data && res.data.isAuch === false){
                error('Ошибка авторизации, истекла сессия токена')
                dispatch(setProducts([]))
                return auch.logout(router)
            }
            message('Удаление продукта выполнено успешно! =)')
            dispatch(setProducts(res.data.products))
            props.closeDialog()
        } else {
            error('При удалении товара что то пошло не так! =(')
            props.closeDialog()
        }
    }

    let updateProduct = async () => {
        let cookie = getCookie('auth')

        let data = {
            id: props.productId,
            DescProductId: genetalTabs.DescProductId,
            DescProductTableId: genetalTabs.DescProductTableId,
            name: genetalTabs.name,
            inStock: genetalTabs.inStock === true ? 1 : 0,
            countInStock: genetalTabs.countInStock,
            category: genetalTabs.category,
            price: genetalTabs.price,
            Images: Images.length > 0 ? ImagesDeleteDataUrl(Images) : [],
            sale: genetalTabs.sale === true ? 1 : 0,
            salePrice: genetalTabs.salePrice,

            nameDescription: descriptionProductTabs.nameDescription,
            descriptionD: descriptionProductTabs.descriptionD,
            descriptionImages: descriptionProductTabs.descriptionImages.length > 0 ? ImagesDeleteDataUrl(descriptionProductTabs.descriptionImages) : [],
            ImgData: descriptionProductTabs.ImgData,

            typeName: descriptionTableTabs.typeName,
            countPeople: descriptionTableTabs.countPeople,
            features: descriptionTableTabs.features,
            eco: descriptionTableTabs.eco,
            equipment: descriptionTableTabs.equipment,
            structure: descriptionTableTabs.structure,
        }

        deleteImages()

        const formData = new FormData();
        formData.append('product', JSON.stringify(data));
        if (Images.length > 0) {
            Images.forEach((img) => {
                if (img.file) {
                    formData.append('images', img.file);
                }
            })
        }

        if (descriptionProductTabs.descriptionImages.length > 0) {
            descriptionProductTabs.descriptionImages.forEach((img) => {
                if (img.file) {
                    formData.append('imagesDesc', img.file);
                }
            })
        }

        await axios.put(`${process.env.SERVER_UPLOAD_URL}/uploadImageProduct`, formData)
            .then((response) => {
                if (response.status === 200 && response.data.success === true) {
                    data['Images'] = response.data.images
                    data['descriptionImages'] = response.data.imagesDesc
                }
            }).catch((err) => {
                console.log(`uploadProducts ERROR EditProduct`, err);
                error('Crit error! не смогли загрузить картинки на сервер!')
                props.closeDialog()
                return
            })

        let res = await axios.put(`${URL}/products`, data, {
            headers: {
                'authorization': cookie,
            }
        }).catch((err) => {
            console.log(`createProduct ERROR AddProduct`, err);
            return 
        })

        if (res && res !== undefined && res.status === 200) {
            if(res.data && res.data.isAuch === false){
                error('Ошибка авторизации, истекла сессия токена')
                dispatch(setProducts([]))
                return auch.logout(router)
            }
            message('Редактирование товара прошло успешно! =)')
            dispatch(setProducts(res.data.products))
            props.closeDialog()
        } else {
            error('Ошибка pедактирования товара! =(')
            props.closeDialog()
        }
    }

    let deleteImages = async () => {
        let url = needToDeleteImages
        if (needToDeleteImages.length > 0) {
            await axios({
                method: 'DELETE',
                url: `${process.env.SERVER_UPLOAD_URL}/removeImagesProduct`,
                data: { url }
            }).catch((err) => {
                console.log(`delete images ERROR EditProduct`, err);
                //props.closeDialog()
                return
            })
        }
    }

    React.useEffect(() => {
        products.forEach(product => {
            if (product.id === props.productId) {
                dispatch(editProductTabs(product))
            }
        })
        return () => {
            dispatch(resetProductTabs())
            dispatch(resetNeedToDeleteImages())
        }
    }, [])

    return (
        <Dialog fullScreen open={props.open} onClose={() => { props.closeDialog() }} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar className={classes.Toolbar}>
                    <IconButton edge="start" color="inherit" onClick={() => { props.closeDialog() }} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Окно для редактирования товара
                    </Typography>
                    <Button className={classNames(`${classes.delete}`, `${classes.topBarLeft}`)} color="inherit" onClick={() => { deleteProduct() }}>
                        Удалить товар
                    </Button>
                    <Button className={classes.topBarLeft} color="inherit" onClick={() => { updateProduct() }}>
                        Сохранить
                    </Button>
                </Toolbar>
            </AppBar>
            <List>
                <EditProductTabs />
            </List>
        </Dialog>
    );
}
