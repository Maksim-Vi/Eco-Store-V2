import { Grid, makeStyles, Tooltip, Typography, TextField, Divider, CardContent, Card, Button } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setDescriptionTableTabsData } from '../../../../redux/reducers/SRM/products/action';

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
    Container: {

    },
    gridContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '30px',
        [theme.breakpoints.down('sm')]: {
            padding:'0px',
        },
    },
    gridColum: {
        display: 'flex',
        // flexDirection: 'column',
    },
    Divider:{
        marginTop: 20
    }
}));

export const DescriptionTabs = () => {
    const classes = useStyles();

    const dispatch = useDispatch()
    const descriptionTableTabs = useSelector(state => state.CRM_products.descriptionTableTabs)

    const [descriptionTabs, setDescriptionTabs] = React.useState({
        typeName:descriptionTableTabs.typeName,
        countPeople: descriptionTableTabs.countPeople,
        features:descriptionTableTabs.features,
        eco:descriptionTableTabs.eco,
        equipment:descriptionTableTabs.equipment,
        structure:descriptionTableTabs.structure,
    });

    let handleChange = (event) => {
        setDescriptionTabs({ ...descriptionTabs, [event.target.name]: event.target.value })
    };

    let addDescriptionTabsData = () =>{
        dispatch(setDescriptionTableTabsData(descriptionTabs))
    }


    return (
        <>
            <Card className={classes.CardWrapper}>
                <CardContent className={classes.Container}>
                    <Grid className={classes.gridContainer} container spacing={3} wrap="wrap">
                        <Tooltip title="Тип товара 'например: Столовые приборы'">
                            <Grid item md={12} sm={12} xs={12}>
                                <Typography color="textPrimary" gutterBottom variant="h6">Тип товара</Typography>
                                <TextField fullWidth label="Тип Товара" margin="normal" name="typeName"
                                    onChange={handleChange} type="typeName" value={descriptionTabs.typeName} variant="outlined" />
                            </Grid>
                        </Tooltip>

                        <Tooltip title="Количество персон 'например: 1'">
                            <Grid item md={12} sm={12} xs={12}>
                                <Typography color="textPrimary" gutterBottom variant="h6">Количество персон</Typography>
                                <TextField fullWidth label="Количество персон" margin="normal" name="countPeople"
                                    onChange={handleChange} type="countPeople" value={descriptionTabs.countPeople} variant="outlined" />
                            </Grid>
                        </Tooltip>

                        <Tooltip title="Описание особенностей товара 'например: Подходит для многократного использования'">
                            <Grid item md={12} sm={12} xs={12}>
                                <Typography color="textPrimary" gutterBottom variant="h6">Особенности товара</Typography>
                                <TextField fullWidth label="Особенности товара" margin="normal" name="features"
                                    onChange={handleChange} type="features" value={descriptionTabs.features} variant="outlined" />
                            </Grid>
                        </Tooltip>

                        <Tooltip title="Описание типа товара 'например: Экологически чистый продукт'">
                            <Grid item md={12} sm={12} xs={12}>
                                <Typography color="textPrimary" gutterBottom variant="h6">Материал</Typography>
                                <TextField fullWidth label="Материал" margin="normal" name="eco"
                                    onChange={handleChange} type="eco" value={descriptionTabs.eco} variant="outlined" />
                            </Grid>
                        </Tooltip>
                    </Grid>
                </CardContent>
            </Card>

            <Card className={classes.CardWrapper}>
                <CardContent className={classes.Container}>
                    <Tooltip title="Комплектация товара 'например: ложка, вилка, палочки (на выбор при наличии)'">
                        <Grid item md={12} sm={12} xs={12}>
                            <Typography color="textPrimary" gutterBottom variant="h6">Комплектация товара</Typography>
                            <TextField fullWidth label="Комплектация товара" margin="normal" name="equipment"
                                onChange={handleChange} type="equipment" value={descriptionTabs.equipment} variant="outlined" />
                        </Grid>
                    </Tooltip>

                    <Tooltip title="Тип и структура товара 'например: Дерево Нанму'">
                        <Grid item md={12} sm={12} xs={12}>
                            <Typography color="textPrimary" gutterBottom variant="h6">Тип и структура товара</Typography>
                            <TextField fullWidth label="Тип и структура товара" margin="normal" name="structure"
                                onChange={handleChange} type="structure" value={descriptionTabs.structure} variant="outlined" />
                        </Grid>
                    </Tooltip>
                </CardContent>

                <Divider className={classes.Divider}/>
                <Button color="primary" variant="contained" onClick={addDescriptionTabsData}>сохранить изменения</Button>
            </Card>
        </>
    )
}

export default DescriptionTabs
