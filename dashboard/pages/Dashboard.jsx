import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import Budget from '../dashboardComponents/Budget';
import LatestOrders from '../dashboardComponents/LatestOrders';
import TasksProgress from '../dashboardComponents/TasksProgress';
import TotalCustomers from '../dashboardComponents/TotalCustomers';
import TotalProfit from '../dashboardComponents/TotalProfit';

const Dashboard = () => (

  <Container maxWidth={false}>
    <Grid container spacing={3}>
      <h2>hello dashboard</h2>
      {/* <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Budget />
          </Grid>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalCustomers />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TasksProgress />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalProfit sx={{ height: '100%' }} />
          </Grid>
      <Grid item lg={8} md={12} xl={9} xs={12}>
             <Sales />
          </Grid>
      <Grid item lg={4} md={6} xl={3} xs={12} >
            <TrafficByDevice sx={{ height: '100%' }} />
          </Grid>
      <Grid item lg={12} md={12} xl={12} xs={12}>
            <LatestProducts sx={{ height: 'auto' }} />
          </Grid>
      <Grid item lg={12} md={12} xl={12} xs={12}>
            <LatestOrders sx={{ height: 'auto' }}  />
          </Grid> */}
    </Grid>
  </Container>
);

export default Dashboard;
