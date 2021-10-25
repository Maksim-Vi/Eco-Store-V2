import {
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  gridColum:{
    display: 'flex',
    flexDirection: 'column'
  }
}));


const SettingsNotifications = (props) => {
  const classes = useStyles();
  return (
    <form {...props}>
      <Card>
        <CardContent>
          <Grid container spacing={6} wrap="wrap">
            <Grid className={classes.gridColum} item md={4} sm={6} xs={12}>
              <Typography color="textPrimary" gutterBottom variant="h6">
                Данные на главной странице
              </Typography>
              <FormControlLabel
                control={(<Checkbox color="primary" defaultChecked />)}
                label="Показывать слайдер навигации по сайту"
              />
              <FormControlLabel
                control={(<Checkbox color="primary" defaultChecked/>)}
                label="Показывать слайдер Топ товаров"
              />
              <FormControlLabel
                control={<Checkbox color="primary" defaultChecked/>}
                label="Показывать Grid (сетку) Топ товаров"
              />
              <FormControlLabel
                control={(<Checkbox color="primary" defaultChecked />)}
                label="Показывать отзывы"
              />
               <FormControlLabel
                control={(<Checkbox color="primary" defaultChecked />)}
                label="Показывать форму связи с нами"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  )
};

export default SettingsNotifications;
