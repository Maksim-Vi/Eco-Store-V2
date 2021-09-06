import {
    Avatar,
    Box,
    Card,
    CardContent,
    Divider,
    Grid,
    makeStyles,
    Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    cardContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        cursor: 'pointer'
    },
    boxWrapper: {
        display: 'flex',
        justifyContent: 'center',
    },
    Avatar: {
        maxWidth: '200px',
        maxHeight: '200px',
        width:'100%',
        height:'100%'
    },
    gridContainer: {
        padding: '10px',
        justifyContent: 'space-between',
    },
    gridItem: {
        display: 'flex',
        alignItems: 'center'
    }

}));

const ProductCard = ({ openEditCard, product, ...rest }) => {

    const classes = useStyles();
   
    return (
        <Card className={classes.cardContainer} {...rest} onClick={() => { openEditCard(product.id) }}>
            <CardContent>
                {product.images !== ''
                    ? <Box className={classes.boxWrapper}>
                        <Avatar className={classes.Avatar} alt="Product" src={`${product.images[0].url.split('public')[1]}`} variant="square" />
                    </Box>
                    : <Box className={classes.boxWrapper}>
                        <Avatar className={classes.Avatar} alt="Product" src={``} variant="square" />
                    </Box>
                }

                <Typography align="center" color="textPrimary" gutterBottom variant="h6">
                    {product.name}
                </Typography>
            </CardContent>

            <Box style={{ flexGrow: 1 }} />
            <Divider />
            <Box>
                <Grid container spacing={2} className={classes.gridContainer}>
                    <Grid item className={classes.gridItem} >
                        <Typography color="textSecondary" display="inline" variant="body2">
                            цена : {product.price} грн
                        </Typography>
                    </Grid>
                    <Grid item className={classes.gridItem} >
                        {product.inStock
                            ? <Typography style={{color:'green'}} display="inline" variant="body2">в наличии</Typography>
                            : <Typography color="error" display="inline" variant="body2">нет в наличии</Typography>
                        }

                    </Grid>
                    <Grid item className={classes.gridItem} >
                        <Typography color="textSecondary" display="inline" variant="body2">
                            {product.countInStock} шт
                        </Typography>
                    </Grid>
                    <Grid item className={classes.gridItem} >
                        {product.sale
                            ? <Typography style={{color:'green'}} display="inline" variant="body2">
                                скидка: {product.salePrice}грн
                            </Typography>
                            : <Typography color="error" display="inline" variant="body2">
                                без скидки
                            </Typography>
                        }

                    </Grid>
                </Grid>
            </Box>
        </Card>
    )
}

export default ProductCard;
