import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  gridColum: {
    display: 'flex',
    flexDirection: 'column'
  }
}));


const SettingsNotifications = ({ settings, ChangeStateSettings }) => {

  const classes = useStyles();

  if (!settings) return null

  return (
    <Card>
      <CardContent>
        <Grid container spacing={6} wrap="wrap">
          <Grid className={classes.gridColum} item md={4} sm={6} xs={12}>
            <Typography color="textPrimary" gutterBottom variant="h6">
              Данные на главной странице
            </Typography>
            <FormControlLabel control={
              (<Checkbox color="primary" checked={settings.isShowNavSlider} onChange={ChangeStateSettings} name="isShowNavSlider" />)
            }
              label="Показывать слайдер навигации по сайту"
            />
            <FormControlLabel control={
              (<Checkbox color="primary" checked={settings.isShowTopSlider} onChange={ChangeStateSettings} name="isShowTopSlider" />)
            }
              label="Показывать слайдер Топ товаров"
            />
            <FormControlLabel
              control={<Checkbox color="primary" checked={settings.isShowTopGrid} onChange={ChangeStateSettings} name="isShowTopGrid" />}
              label="Показывать Grid (сетку) Топ товаров"
            />
            <FormControlLabel
              control={(<Checkbox color="primary" checked={settings.isShowReviews} onChange={ChangeStateSettings} name="isShowReviews" />)}
              label="Показывать отзывы"
            />
            <FormControlLabel
              control={(<Checkbox color="primary" checked={settings.isShowContactUs} onChange={ChangeStateSettings} name="isShowContactUs" />)}
              label="Показывать форму связи с нами"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
};

export default SettingsNotifications;
