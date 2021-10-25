import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    Divider,
    FormControlLabel,
    Grid,
    makeStyles,
    Typography
} from '@material-ui/core';
import { Slider } from './Slider';

const useStyles = makeStyles(() => ({
    CardContainer:{
        marginTop: 20
    },
    gridColum: {
        display: 'flex',
        flexDirection: 'column'
    }
}));


const SettingsAdvertisingSlider = (props) => {
    const classes = useStyles();
    return (
        <form {...props}>
            <Card className={classes.CardContainer}>
                <CardContent>
                    <Grid className={classes.gridColum} item md={4} sm={6} xs={12}>
                        <Typography color="textPrimary" gutterBottom variant="h6" >Рекламный слайдер главной страницы</Typography>
                        <FormControlLabel
                            control={(<Checkbox color="primary" defaultChecked />)}
                            label="Показывать слайдер рекламы"
                        />
                        <Slider />
                    </Grid>
            </CardContent>
        </Card>
        </form >
    )
};

export default SettingsAdvertisingSlider;