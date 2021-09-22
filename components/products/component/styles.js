import { makeStyles } from "@material-ui/core";

export const useBuyMenu = makeStyles((theme) => ({
    dialog: {
        '& .MuiDialog-paper':{
            [theme.breakpoints.down('sm')]: {
                margin: 5
            },
        }
    },
    dialogContent: {
        padding: theme.spacing(2),
        margin: 'auto',
        width:'800px',
        height: '700px',
        maxWidth: '100%',
        maxHeight: '100%',
        [theme.breakpoints.down('sm')]: {
            width:'800px',
            height: '800px',
        },
    },
    closeBtn:{
        display: 'flex',
        marginLeft:'auto',
        '&:hover':{
            cursor: 'pointer',
            color: 'red',
        }
    },
    card:{
        display: 'flex',
        flexDirection:'column',
        width:'100%',
        marginTop: 10,
    },
    cardItem:{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        padding: '10px 0 10px 0',
    },
    cardItemJustify:{
        justifyContent:'space-around',
    },
    imageProductMain:{
        width: theme.spacing(15),
        height: theme.spacing(15),
        marginLeft: 10
    },
    cardItemName:{
        fontFamily: 'Montserrat, sans-serif',
        marginLeft: 10
    },
    cardItemUpDown:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    },
    UpDown:{
        fontFamily: 'Montserrat, sans-serif',
        color: '#fff',
        fontWeight: 'bold',
        background: 'rgba(119, 119, 119, 0.637)',
        padding: '8px 18px',
        margin: '0 10% 0 10%',
        fontSize: '1.2em',
        display: 'inline-block',
        borderRadius: '20%',
        lineHeight: '0.85',
        cursor: 'pointer',
    },
    cardItemPrice:{
        display:'flex',
        alignItems:'center',    
        marginLeft: 'auto',
        margin: 10,
        fontFamily: 'Montserrat, sans-serif',  
    },
    cardToBascketContainer:{
        marginTop: 10,
        padding: 10,
        '& .MuiCardActions-root':{
            justifyContent: 'space-between'
        }
    },
    
    itemDescContainer:{
        width: '70%',
        maxWidth:'100%',
        '& .MuiBox-root':{
            fontFamily: 'Montserrat, sans-serif',   
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    itemDesc:{
        display: 'flex',
        width:' 100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
            flexDirection:'column'
        },
    },

    divider:{
        margin: 10
    }
   
}));

// display: flex;
// width: 100%;
// align-items: center;
// justify-content: space-between;