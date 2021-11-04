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
        height: '650px',
        maxWidth: '100%',
        maxHeight: '100%',
        [theme.breakpoints.down('sm')]: {
            width:'800px',
            height: '700px',
        },
    },
    closeBtn:{
        position: 'absolute',
        top: '5px',
        right: '10px',
        // display: 'flex',
        // marginLeft:'auto',
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
        width: '95%',
        padding: '10px 0 10px 0',
        [theme.breakpoints.down('sm')]: {
            alignItems:'center',
            justifyContent:'center',
            flexDirection: 'column',
        },
    },
    cardItemJustify:{
        justifyContent:'space-around',
    },
    imageProductMain:{
        width: theme.spacing(20),
        height: theme.spacing(20),
        marginLeft: 10
    },
    textItemContainer:{
        display: 'flex',
        flexDirection: 'column',
    },
    cardItemName:{
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600,
        marginLeft: 10,
        [theme.breakpoints.down('sm')]: {
            textAlign:'center'
        },
    },
    descItem:{
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600,
        marginLeft: 10,
    },
    itemId:{
        fontFamily: 'Montserrat, sans-serif',
        marginLeft: 10 
    },
    cardItemUpDown:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        marginLeft:'auto',
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0
        },
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
        marginTop: 40,
        padding: 10,
        '& .MuiCardActions-root':{
            justifyContent: 'space-between',
            [theme.breakpoints.down('sm')]: {
                padding: 0,
            },
        }
    },
    
    itemDescContainer:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems: 'center',
        width: '95%',
        '& .MuiBox-root':{
            fontFamily: 'Montserrat, sans-serif',   
        },
        [theme.breakpoints.down('sm')]: {
            flexDirection:'row',
            // flexWrap: 'wrap',
            width: '100%',
        },
    },
    image:{
        width: '70px',
        height:'auto',
        margin: '0 10px 0 10px'
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

    CardBtn:{
        border: '1px solid green',
        borderRadius: '5px',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        cursor: 'pointer',
    },
    BtnInBasket:{
        display: 'block',
        marginRight: '5px'
    },
    BtnImg:{
        width: '13px'
    },
   
    divider:{
        margin: 10
    }
   
}));

// display: flex;
// width: 100%;
// align-items: center;
// justify-content: space-between;