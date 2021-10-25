import {
    CardHeader,
    Container,
    Grid
} from '@material-ui/core';

const Account = () => (
    <Container maxWidth="lg">
        <CardHeader subheader="На этой вкладке можно отредактировать аккаунт в CRM" title="Аккаунт"/>
        <Grid
            container
            spacing={3}
        >
            <Grid
                item
                lg={4}
                md={6}
                xs={12}
            >
                {/* <AccountProfile /> */}
            </Grid>
            <Grid
                item
                lg={8}
                md={6}
                xs={12}
            >
                {/* <AccountProfileDetails /> */}
            </Grid>
        </Grid>
    </Container>

);

export default Account;
