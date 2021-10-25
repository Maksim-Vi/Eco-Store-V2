import { CardHeader, Container } from '@material-ui/core';
import SettingsAdvertisingSlider from '../settings/SettingsAdvertisingSlider';
import SettingsNotifications from '../settings/SettingsNotifications';
import DashboardAddButton from '../utilits/DashboardAddButton';

const Settings = () => (
  <Container maxWidth="lg">
    <CardHeader subheader="На этой вкладке можно применять разные настройки для CRM" title="Настройки" />
    <DashboardAddButton openDialog={()=>{console.log('add reviews');}} textButton={'сохранить'}/>
    <SettingsNotifications />
    <SettingsAdvertisingSlider />
  </Container>
);

export default Settings;
