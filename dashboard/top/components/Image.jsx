import { Avatar, ListItemAvatar } from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder';
import React from 'react'

export default function Image() {
    return (
        <ListItemAvatar>
            <Avatar>
                <FolderIcon />
            </Avatar>
        </ListItemAvatar>
    )
}
