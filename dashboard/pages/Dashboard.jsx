import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import Budget from '../dashboard/Budget';
import LatestOrders from '../dashboard/LatestOrders';
import TasksProgress from '../dashboard/TasksProgress';
import TotalCustomers from '../dashboard/TotalCustomers';
import TotalProfit from '../dashboard/TotalProfit';
import Sales from '../dashboard/Sales';
import TrafficByDevice from '../dashboard/TrafficByDevice';
import LatestProducts from '../dashboard/LatestProducts';

const Dashboard = () => (

  <Container maxWidth={false}>
    <Grid container spacing={3}>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
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
      {/* <Grid item lg={8} md={12} xl={9} xs={12}>
        <Sales />
      </Grid>
      <Grid item lg={4} md={6} xl={3} xs={12} >
        <TrafficByDevice sx={{ height: '100%' }} />
      </Grid> */}
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <LatestOrders sx={{ height: 'auto' }} />
      </Grid>
    </Grid>
  </Container>
);

export default Dashboard;
