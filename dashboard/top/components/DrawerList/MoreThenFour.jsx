import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core'
import React from 'react'

export default function MoreThenFourPopup({showInfo,setShowInfo}) {
    return (
        <Dialog
            open={showInfo}
            onClose={setShowInfo}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Выбрано максимальное количество товаров для отображения на странице топ!
            Нажмите кнопку "Окей" , а затем кнопку "сохранить"
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
