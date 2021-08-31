import { ListItemText } from '@material-ui/core'
import React from 'react'

export default function Text(props) {
    const [secondary, setSecondary] = React.useState(false);

    return (
        <ListItemText primary={props.text} secondary={secondary ? 'Secondary text' : null} />
    )
}
