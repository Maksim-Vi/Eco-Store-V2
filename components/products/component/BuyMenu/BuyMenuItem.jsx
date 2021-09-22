import { Avatar, Box, Card, CardActions, CardContent, Dialog, DialogContent, Divider, Grid, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import React from 'react'
import { useBuyMenu } from '../styles';
import Item from './Item';

const BuyMenuItem = (props) => {

    const classes = useBuyMenu();

    return (
        <Dialog className={classes.dialog}
            open={props.open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth='xl'
        >

            <DialogContent className={classes.dialogContent}>
                <CloseIcon className={classes.closeBtn} onClick={() => { props.CloseBuyMenu() }} />
    
                <Item item={props.item}/>
                                         
                <Card className={classes.cardToBascketContainer} xs={12}>
                    <CardActions className={classes.cardToBascket}>
                        <p>назад к товару</p>
                        <span>к корзине</span>
                    </CardActions>
                </Card>
            </DialogContent>

        </Dialog>
    )
}

export default BuyMenuItem