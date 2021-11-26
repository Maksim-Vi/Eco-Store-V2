import { Card, CardActions, Dialog, DialogContent,Button } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import React from 'react'
import { useBuyMenu } from '../styles';
import Item from './Item';
import Link from "next/link";
import LookTheSame from './LookTheSame';

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
    
                <Item item={props.item} toggleOpenConfirm={props.toggleOpenConfirm}/>
                                         
                <Card className={classes.cardToBascketContainer} xs={12}>
                    <CardActions className={classes.cardToBascket}>
                        <Button color="primary" onClick={()=>{props.CloseBuyMenu()}}>назад к товару</Button>
                        <Link href="/basket" as={'/basket'}>
                            <button className={classes.CardBtn}>
                                <p className={classes.BtnInBasket} style={{display: 'block'}}>перейти в корзину</p>
                                <img className={classes.BtnImg} src="/contentImg/products/buy2.png" alt="" />
                            </button>
                        </Link>
                    </CardActions>
                </Card>
                {/* <LookTheSame /> */}
            </DialogContent>

        </Dialog>
    )
}

export default BuyMenuItem