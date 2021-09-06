import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core'
import React from 'react'

export default function ErrorPopup({showInfo,setShowInfo,text = ''}) {
    return (
        <Dialog
            open={showInfo}
            onClose={setShowInfo}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={setShowInfo} color="primary" autoFocus>
            Окей
          </Button>
        </DialogActions>
      </Dialog>
    )
}
