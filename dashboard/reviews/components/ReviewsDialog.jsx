import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, makeStyles, Slide, TextField } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    DialogContainer: {
        padding: 10,
        width: "100%",
        '& .MuiDialog-paper': {
            [theme.breakpoints.down('md')]: {
                margin: 0
            },
        }
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    TextField: {
        width: "95%"
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ReviewsDialog({ stateReviews, open, closeReviewsDialog, saveReviews, changeStateReviews }) {
    const classes = useStyles();
    return (
        <Dialog
            className={classes.DialogContainer}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={closeReviewsDialog}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogContent>
                <form className={classes.root} autoComplete="off">
                    <TextField id="outlined-basic"
                        className={classes.TextField}
                        name='userName'
                        label="Имя человка оставившего отзыв"
                        variant="outlined"
                        value={stateReviews.userName}
                        onChange={changeStateReviews} />
                    <TextField className={classes.TextField}
                        name='reviewsText'
                        label="Текст отзыва"
                        variant="outlined"
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        value={stateReviews.reviewsText}
                        onChange={changeStateReviews} />
                    <TextField id="outlined-basic"
                        name='reviewsCurrentUrl'
                        className={classes.TextField}
                        label="Url на тикущий отзыв"
                        variant="outlined"
                        value={stateReviews.reviewsCurrentUrl}
                        onChange={changeStateReviews} />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={stateReviews.isGoogle}
                                onChange={changeStateReviews}
                                name="isGoogle"
                                color="primary"
                            />
                        }
                        label="Отзыв с гугл?"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={stateReviews.isShowInMainPage}
                                onChange={changeStateReviews}
                                name="isShowInMainPage"
                                color="primary"
                            />
                        }
                        label="Показывать отзыв в слайдере на главной странице?"
                    />
                </form>


            </DialogContent>
            <DialogActions>
                <Button onClick={saveReviews} color="primary">
                    Сохранить отзыв
                </Button>
            </DialogActions>
        </Dialog>
    )
}

// userName	reviewsText	reviewsCurrentUrl	isShowInMainPage	