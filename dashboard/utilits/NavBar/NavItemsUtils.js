import DashboardIcon from '@material-ui/icons/Dashboard';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import RateReviewIcon from '@material-ui/icons/RateReview';
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
        title: 'Доска',
        id: uuid()
    },
    {
        href: '/AdminPanel/Products',
        icon: FormatListBulletedIcon,
        title: 'Товары',
        id: uuid()
    },
    {
        href: '/AdminPanel/Top',
        icon: FormatListBulletedIcon,
        title: 'Топ товары',
        id: uuid()
    },
    {
        href: '/AdminPanel/Reviews',
        icon: RateReviewIcon,
        title: 'Отзывы',
        id: uuid()
    },
    {
        href: '/AdminPanel/Settings',
        icon: SettingsIcon,
        title: 'Настройки',
        id: uuid()
    }
];