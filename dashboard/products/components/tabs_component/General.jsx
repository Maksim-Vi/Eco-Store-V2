import { Grid, makeStyles, Tooltip, Typography, TextField, CardContent, Card, FormControlLabel, Checkbox, Divider, Button, FormControl } from '@material-ui/core'
import React from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useDispatch, useSelector } from 'react-redux';
import { setGeneralTabsData } from '../../../../redux/reducers/SRM/products/action';

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
    saleGrid: {
        display: 'flex',
        alignItems: 'center',
    },
    category:{
        width: '100%',
    }
}));

export const General = () => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const genetalTabs = useSelector(state => state.CRM_products.genetalTabs)

    const [generalTabProduct, setGeneralTabProduct] = React.useState({
        name: genetalTabs.name,
        inStock: genetalTabs.inStock,
        countInStock:  genetalTabs.countInStock,
        category: genetalTabs.category,
        price: genetalTabs.price,
        sale: genetalTabs.sale,
        salePrice: genetalTabs.salePrice,
        DescProductId: genetalTabs.DescProductId,
        DescProductTableId: genetalTabs.DescProductTableId
    });

    let handleChange = (event) => {
        if(event.target.name === 'sale' || event.target.name === 'inStock'){
            setGeneralTabProduct({ ...generalTabProduct, [event.target.name]: event.target.checked });
        } else {
            setGeneralTabProduct({ ...generalTabProduct, [event.target.name]: event.target.value });
        } 
    };

    let addGeneralData = () =>{
        dispatch(setGeneralTabsData(generalTabProduct))
    }

    return (
        <Card className={classes.CardWrapper}>
            <CardContent className={classes.Container}>
                <Grid className={classes.gridContainer} container spacing={3} wrap="wrap">
                    {/* <Tooltip title="Код товара">
                        <Grid item md={12} sm={12} xs={12}>
                            <Typography color="textPrimary" gutterBottom variant="h6">Код товара</Typography>
                            <TextField fullWidth label="Код товара" margin="normal" name="IdProduct"
                                onChange={() => { }} type="IdProduct" value={''} variant="outlined" />
                        </Grid>
                    </Tooltip> */}

                    <Tooltip title="Имя товара">
                        <Grid item md={12} sm={12} xs={12}>
                            <Typography color="textPrimary" gutterBottom variant="h6">Имя товара (Общая)</Typography>
                            <TextField fullWidth label="Имя товара" margin="normal" name="name"
                                onChange={handleChange} type="name" value={generalTabProduct.name} variant="outlined" />
                        </Grid>
                    </Tooltip>

                    <Tooltip title="В наличии/нет в наличии">
                        <Grid item md={12} sm={12} xs={12}>
                            <Typography color="textPrimary" gutterBottom variant="h6">В наличии/нет в наличии</Typography>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={generalTabProduct.inStock}
                                        onChange={handleChange}
                                        name="inStock"
                                        color="primary"
                                    />
                                }
                            />
                        </Grid>
                    </Tooltip>

                    <Tooltip title="Количество товара на сколаде (шт)">
                        <Grid item md={12} sm={12} xs={12}>
                            <Typography color="textPrimary" gutterBottom variant="h6">Количество товара на складе</Typography>
                            <TextField fullWidth label="Количество товара на складе" margin="normal" name="countInStock"
                                onChange={handleChange} type="countInStock" value={generalTabProduct.countInStock} variant="outlined" />
                        </Grid>
                    </Tooltip>

                    <Tooltip title="Категория (для перехода по меню)">
                        <Grid item md={12} sm={12} xs={12}>
                            <Typography color="textPrimary" gutterBottom variant="h6">категория (меню)</Typography>
                            <FormControl variant="outlined">
                                <Select
                                    className={classes.category}
                                    labelId="demo-simple-select-outlined-label"
                                    id = "demo-simple-select-outlined"
                                    name = "category"
                                    value={generalTabProduct.category}
                                    onChange={handleChange}
                                    label= "category"
                                >
                                    <MenuItem value={'приборы'}>приборы</MenuItem>
                                    <MenuItem value={'уход'}>уход</MenuItem>
                                    <MenuItem value={'трубочки'}>трубочки</MenuItem>
                                    <MenuItem value={'мешочки'}>мешочки</MenuItem>
                                    <MenuItem value={'бокс'}>бокс</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Tooltip>

                    <Tooltip title="цена товара">
                        <Grid item md={12} sm={12} xs={12}>
                            <Typography color="textPrimary" gutterBottom variant="h6">цена товара</Typography>
                            <TextField fullWidth label="Цена товара" margin="normal" name="price"
                                onChange={handleChange} type="price" value={generalTabProduct.price} variant="outlined" />
                        </Grid>
                    </Tooltip>

                    <Tooltip title="Скидка">
                        <Grid item md={12} sm={12} xs={12}>
                            <Typography color="textPrimary" gutterBottom variant="h6">Скидка (грн)</Typography>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={generalTabProduct.sale}
                                        onChange={handleChange}
                                        name="sale"
                                        color="primary"
                                    />
                                }
                            />

                            <TextField fullWidth label="Скидка" margin="normal" name="salePrice"
                                onChange={handleChange} type="salePrice" value={generalTabProduct.salePrice} variant="outlined" />

                            <Typography color="textPrimary" variant="h6">{generalTabProduct.price - generalTabProduct.salePrice} грн</Typography>

                        </Grid>
                    </Tooltip>
                </Grid>
            </CardContent>
            <Divider />
            <Button color="primary" variant="contained" onClick={addGeneralData}>сохранить изменения</Button>
        </Card>
    )
}

export default General
