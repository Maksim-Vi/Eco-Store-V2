import { IconButton, ListItemSecondaryAction } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import React from 'react'

export default function Button(props) {
    return (
        <ListItemSecondaryAction onClick={()=>{props.toggleDrawer(true)}}>
            <IconButton edge="end" aria-label="delete">
                <EditIcon />
            </IconButton>
        </ListItemSecondaryAction>
    )
}
