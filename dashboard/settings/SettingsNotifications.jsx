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

const useStyles = makeStyles(() => ({
  gridColum:{
    display: 'flex',
    flexDirection: 'column'
  },
  btnContainer:{
    display: 'flex',
    justifyContent: 'flex-end',
    p: 2
  }
}));


const SettingsNotifications = (props) => {
  const classes = useStyles();
  return (
    <form {...props}>
      <Card>
        <CardHeader
          subheader="Manage the notifications"
          title="Notifications"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={6} wrap="wrap">
            <Grid className={classes.gridColum} item md={4} sm={6} xs={12}>
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h6"
              >
                Notifications
              </Typography>
              <FormControlLabel
                control={(<Checkbox color="primary" defaultChecked />)}
                label="Email"
              />
              <FormControlLabel
                control={(<Checkbox color="primary" defaultChecked/>)}
                label="Push Notifications"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Text Messages"
              />
              <FormControlLabel
                control={(<Checkbox color="primary" defaultChecked />)}
                label="Phone calls"
              />
            </Grid>
            <Grid className={classes.gridColum} item md={4} sm={6} xs={12}>
              <Typography color="textPrimary" gutterBottom variant="h6" >
                Messages
              </Typography>
              <FormControlLabel
                control={(<Checkbox color="primary" defaultChecked />)}
                label="Email"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Push Notifications"
              />
              <FormControlLabel
                control={(<Checkbox color="primary" defaultChecked />)}
                label="Phone calls"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Box className={classes.btnContainer}>
          <Button color="primary" variant="contained">
            Save
          </Button>
        </Box>
      </Card>
    </form>
  )
};

export default SettingsNotifications;
