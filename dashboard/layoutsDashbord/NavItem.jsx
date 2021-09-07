
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { List } from '@material-ui/core';
import { items } from '../utilits/NavBar/NavItemsUtils';
import Link from 'next/link'

const NavItem = () => {
  let Icon = items[0].icon
  return (
    <List>
      {items.map((item, index) => {
        let Icon = item.icon
        return (
          <Link key={item.id} href={item.href} as={item.href}>
            <ListItem button>
              <ListItemIcon>{Icon && (<Icon size="20" />)}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          </Link>
        )
      })}
    </List>
  );
};

export default NavItem;
