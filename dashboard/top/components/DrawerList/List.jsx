import { Avatar, Button, Checkbox, FormControlLabel, ListItem, ListItemText, makeStyles } from '@material-ui/core'
import React from 'react'
import MoreThenFourPopup from './MoreThenFour';

const useStyles = makeStyles({
    avatar:{
        marginRight: 20
    },
    checkMark:{
        marginLeft: 20
    },
});

export default function List({item,addPopularItem,popularItems}) {

    const classes = useStyles();

    let [selected,setSelected] = React.useState(false)
    let [showInfo, setShowInfo] = React.useState(false)

    let handleCheked = () =>{
        if(popularItems.length === 4 && selected === false){
            setShowInfo(true)
            return 
        }

        let data = {
            id: item.id,
            image: item.images[0].url.split('public')[1],
            text: '',
            isCheked: !selected,
            isNew: true
        }

        addPopularItem(data)
        setSelected(!selected)
    }

    React.useEffect(()=>{
        if(popularItems.length > 0){
            popularItems.forEach((i)=>{
                if(i.id === item.id){
                    setSelected(true)
                }
            })
        }
    },[])

    return (
        <>
            <ListItem button key={item.id}>
                <Avatar className={classes.avatar} alt="Remy Sharp" src={item.images[0].url.split('public')[1]} />
                <ListItemText primary={item.name} />
                <Button variant="contained"
                    color="primary"
                    onClick={() => { handleCheked() }}>
                    для выбора товара в топ нажмите на кнопку
                </Button>
                <FormControlLabel className={classes.checkMark}
                    control={
                        <Checkbox
                            disabled
                            checked={selected}
                            name={item.id}
                            color="primary"
                        />
                    }
                />
            </ListItem>
            {showInfo &&
                <MoreThenFourPopup showInfo={showInfo} setShowInfo={()=>{setShowInfo(false)}}/>

            }
        </>
    )
}
