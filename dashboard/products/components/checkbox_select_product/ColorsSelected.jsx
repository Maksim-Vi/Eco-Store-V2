import React from 'react'
import { makeStyles, CardContent, Divider, Box } from "@material-ui/core";
import { CirclePicker } from "react-color";

const useStyles = makeStyles((theme) => ({
    Divider: {
        marginTop: 10
    },
    colorItemContainer: {
        position: 'relative',
    },
    delete: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    colorItem: {
        margin: 5,
        borderRadius: 10,
        width: 50,
        height: 50,
        cursor: 'pointer'
    }
}));


const AddColors = () => {
    const classes = useStyles();

    let [color, setColor] = React.useState([])

    let handleChange = (e) => {
        let arr = []
        arr.push(e.hex)
        setColor([...color,arr])
    }

    let removeItem = (colorRemove) => {
        let newArr = color.filter(function (item) {
            return item !== colorRemove
        })
        setColor(newArr)
    }

    return (
    <CardContent className={classes.Container}>
        <CirclePicker onChangeComplete={(e)=>{handleChange(e)}} />
        <Divider className={classes.Divider} />
        <Box display='flex' marginTop='10px'>
            {color.map((c) => {
                return <span className={classes.colorItem} key={c}
                    style={{ backgroundColor: c }} onClick={() => { removeItem(c) }} />
            })}
        </Box>
    </CardContent>
    )
}

export default AddColors