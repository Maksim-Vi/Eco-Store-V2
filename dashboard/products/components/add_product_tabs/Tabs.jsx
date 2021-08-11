import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import React from 'react'


function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }

const TabsBar = ({handleChange, value}) => {
    return (
        <AppBar position="static" color="default">
            <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" variant="scrollable"
                scrollButtons="auto" aria-label="scrollable auto tabs example">
                <Tab label="Общие Данные" {...a11yProps(0)} />
                <Tab label="Описание товара" {...a11yProps(1)} />
                <Tab label="Описание таблицы" {...a11yProps(2)} />
                <Tab label="Добавление подтип картинок" {...a11yProps(3)} />
            </Tabs>
        </AppBar>
    )
}

export default TabsBar