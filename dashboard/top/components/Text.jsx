import { Button, ListItemText, makeStyles, TextField } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    addTextContainer:{
        display:'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        '& .MuiButton-root':{
            marginLeft: 10,
            [theme.breakpoints.down('md')]: {
                marginTop: 10,
            },
        },
        [theme.breakpoints.down('md')]: {
            display:'flex', 
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection:'column',
            marginTop: 10,
        },
    },
    text: {
        cursor:'pointer',
        marginLeft: 20
    },
}));

export default function Text(props) {

    const classes = useStyles();

    const [addText, setAddText] = React.useState('');
    const [showField, setShowField] = React.useState(false);

    let AddText = () => {
        props.addTextPopular(props.id,addText)
        setShowField(false)
    }

    React.useEffect(()=>{
        if(props.text !== undefined && props.text !== ''){
            setAddText(props.text)
        }
    },[])

    return (
        <>
            {showField === false 
                ?   <div>
                        <ListItemText className={classes.text}
                                    primary={addText !== '' ? addText : 'нажмите для добавление текста'} 
                                    onClick={()=>{setShowField(true)}} />
                    </div>
                :   <div className={classes.addTextContainer}>
                        <TextField id="outlined-basic" 
                                label="Текст" 
                                variant="outlined" 
                                multiline
                                value={addText}
                                onChange={(e)=>{setAddText(e.target.value)}}/>
                        <Button variant="contained" color="primary" onClick={()=>{AddText()}}>
                            сохранить 
                        </Button>
                    </div>
                
            } 
        </>
    )
}
