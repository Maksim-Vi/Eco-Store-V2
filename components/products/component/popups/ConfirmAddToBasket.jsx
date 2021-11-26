import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const ConfirmAddToBasket = (props) => {

    React.useEffect(() => {
       setTimeout(() => {
            props.toggleOpenConfirm(false)
       }, 1500);
    }, [])

    return (
        <Dialog
            open={props.openConfirm}
            onClose={()=>{props.toggleOpenConfirm(false)}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Товар был успешно добавлен в карзину.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{props.toggleOpenConfirm(false)}} color="primary" autoFocus>
                    Ок
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmAddToBasket
