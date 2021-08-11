import { Box, Container } from '@material-ui/core';
import SettingsNotifications from '../settings/SettingsNotifications';
import SettingsPassword from '../settings/SettingsPassword';

const Settings = () => (
  <Container maxWidth="lg">
    <SettingsNotifications />
    <Box sx={{ pt: 3 }} marginTop='10px'>
      <SettingsPassword />
    </Box>
  </Container>
);

export default Settings;
