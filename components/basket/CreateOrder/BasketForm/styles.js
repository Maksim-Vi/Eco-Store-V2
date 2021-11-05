import { makeStyles } from "@material-ui/core";

export const useStylesForm = makeStyles((theme) => ({
    button: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 20,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            padding: '6px 10px',
            fontSize: '12px'
        },
    },
    actionsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            alignItems: 'center',
        },
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'center'
        }
    },
    buttonContainer: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
        },
        '&.makeStyles-button-7': {
            fontSize: '9px'
        }
    },

    textField: {
        width: '75%',
        '& input': {
            border: 0,
        },
        '& MuiFormHelperText-root': {
            [theme.breakpoints.down('sm')]: {
                fontSize: '0.35rem'
            },
        }
    },
}));
