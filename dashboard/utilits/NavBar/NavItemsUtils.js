import DashboardIcon from '@material-ui/icons/Dashboard';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import { v4 as uuid } from 'uuid';

export const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    jobTitle: 'Senior Developer',
    name: 'Katarina Smith'
};

export const items = [
    {
        href: '/AdminPanel/Dashboard',
        icon: DashboardIcon,
        title: 'Dashboard',
        id: uuid()
    },
    {
        href: '/AdminPanel/Products',
        icon: FormatListBulletedIcon,
        title: 'Products',
        id: uuid()
    },
    {
        href: '/AdminPanel/Account',
        icon: AccountBoxIcon,
        title: 'Account',
        id: uuid()
    },
    {
        href: '/AdminPanel/Settings',
        icon: SettingsIcon,
        title: 'Settings',
        id: uuid()
    }
];