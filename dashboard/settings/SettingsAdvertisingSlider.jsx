import {
    Card,
    CardContent,
    Checkbox,
    FormControlLabel,
    Grid,
    makeStyles,
    Typography
} from '@material-ui/core';
import { SliderAddImage } from './SliderAddImage';

const useStyles = makeStyles(() => ({
    CardContainer: {
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
        <Card className={classes.CardContainer}>
            <CardContent>
                <Grid className={classes.gridColum} item md={4} sm={6} xs={12}>
                    <Typography color="textPrimary" gutterBottom variant="h6" >Рекламный слайдер главной страницы</Typography>
                    <FormControlLabel
                        control={(<Checkbox color="primary" checked={props.settings.isShowAdvertisingSlider} onChange={props.ChangeStateSettings} name="isShowAdvertisingSlider" />)}
                        label="Показывать слайдер рекламы"
                    />
                    {/* <SliderAddImage /> */}
                </Grid>
            </CardContent>
        </Card>
    )
};

export default SettingsAdvertisingSlider;