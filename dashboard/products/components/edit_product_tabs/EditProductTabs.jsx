import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import General from '../tabs_component/General';
import AddImages from '../tabs_component/AddImages';
import DescriptionProduct from '../tabs_component/DescriptionProduct';
import DescriptionTabs from '../tabs_component/DescriptionTabs';
import Settings from '../tabs_component/Settings';
import EditTabsBar from './EditTabs';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    TabPanel:{
        display:'flex',
        alignItems:'center',
        justifyContent: 'center',
    },
    Container:{
        width: '100%'
    }
}));

export default function EditProductTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <EditTabsBar handleChange={handleChange} value={value} />

            <TabPanel value={value} index={0}>
                <General />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <DescriptionProduct />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <DescriptionTabs />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <AddImages />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <Settings />
            </TabPanel>
        </div>
    );
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const classes = useStyles();
    return (
        <div className={classes.TabPanel} role="tabpanel" hidden={value !== index} id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`} {...other}>
            {value === index && (
                <Box className={classes.Container}>
                    {children}
                </Box>
            )}
        </div>
    );
}