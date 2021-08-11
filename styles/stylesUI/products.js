import { makeStyles } from '@material-ui/core/styles';

export const useProductsStyles = makeStyles({
    sectionProducts: {
        height: '100%',
        backgroundColor:'#eaeaead9',
    },
    root: { 
      marginTop: '2%',
      flexGrow: 1,
      background: '#eaeaead9',
      '& .MuiPaper-elevation1':{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
      },
      '& .MuiPaper-root':{
      },
      '& .MuiTab-textColorPrimary.Mui-selected': {
        color: '#075b11',
        },
        '& .PrivateTabIndicator-colorPrimary-4':{
            backgroundColor: '#075b11b5',
        }
    },
    toggleContainer: {
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#eaeaead9',
    },
    contentProductContainer: {
        width:'1200px',
        margin: '0 auto',
        display:'flex',
        alignItems:'center',
        justifyContent: 'space-around',
        alignContent: 'space-around',
        marginTop: '3%',
        flexWrap: 'wrap',
        '&::before, &::after':{
            content: '',
            width: '100%',
            order: 1,
        }
    },
});