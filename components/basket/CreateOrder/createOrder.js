import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import BasketForm from './BasketForm/basketForm';
import PayAndMarch from './BasketForm/basketPayAndMerch'
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { addItemToProduct, postFormBasket } from '../../../redux/reducers/form-reducer';
import { uniqBy } from 'lodash';
import { removeAllItemStore } from '../../../redux/reducers/basket-reducer';
import { Divider } from '@material-ui/core';
import { checkIsHaveDopDesc } from '../../../utility/utils';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 20,
    '& .MuiPaper-root': {
      backgroundColor: '#ececec',
      padding: '20px 0 20px 0',
    },
    '& .MuiStepper-vertical': {
      borderRadius: '10px',
      '& .MuiStepConnector-root': {
        display: 'none',
        flex: 'none',
        borderColor: '#ececec'
      }
    },
    '& .MuiStepContent-root': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 0,
      border: 'none',
      '& .MuiCollapse-root': {
        width: '100%',
      }
    }
  },
  button: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      padding: '6px 50px',
      fontSize: '12px'
    },
  },
  actionsContainer: {
    display: 'flex',
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
      fontSize: '12px'
    },
    '&.makeStyles-button-7': {
      fontSize: '9px'
    }
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  ItemClose: {
    position: 'absolute',
    fontSize: '32px',
    marginTop: '1%',
    marginRight: '1%',
    cursor: 'pointer',
    right: '0',
    color: 'gray',
    '&:hover': {
      color: 'red'
    }
  }
}));

function getSteps() {
  return ['Заполнить форму заказа', //*Имя; *Телефон; Email
    'Заполнить форму для получения']; //*Способ доставки; *Способ оплаты; *Данные (в случае отправки почтой)
}

const CreateOrder = ({ setCreateOrder }) => {
 
  const classes = useStyles();

  const dispatch = useDispatch()
  const form = useSelector(state => state.answerForm)
  const basketItem = useSelector(state => state.basket)

  const [activeStep, setActiveStep] = React.useState(0);
  const [currentOrder, setCurrentOrder] = React.useState('0');
  const steps = getSteps();

  const { addToast, removeAllToasts } = useToasts()

  let message = (mes) => {
    removeAllToasts()
    addToast(mes, { appearance: 'success', autoDismiss: true })
  }

  let error = (mes) => {
    removeAllToasts()
    addToast(mes, { appearance: 'error', autoDismiss: true })
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  let sortBasketItem = (items) => {
    // return uniqBy(items, i => {
    //   if (i.ImgDesc.id !== '') {
    //     return i.id && i.ImgDesc.id
    //   } else {
    //     return i.id
    //   }
    // })
    return uniqBy(items, i => [i.id, i.ImgDesc.id].join())
  }

  let sortBasketItemToOrder = () => {
    let items = sortBasketItem(basketItem.items)
    let item = items.map(item => {
      return {
        id: item.id,
        name: item.name,
        cost: (item.price - item.salePrice),
        type: item.ImgDesc.id !== '' ? item.ImgDesc.imgName : '',
        count: checkIsHaveDopDesc(item.ImgDesc.id, item, basketItem.items) > 0 && checkIsHaveDopDesc(item.ImgDesc.id, item, basketItem.items)
      }
    })
    return item
  }

  const handleCreate = async () => {
    let itemsToOrder = sortBasketItemToOrder()
    if (itemsToOrder.length === 0) {
      error('Выберите товар!')
    } else {
      let namLid = currentOrder
      let data = await dispatch(postFormBasket(namLid, form.firstName, form.Email, form.phone, form.promocode, form.pay, form.post, form.postInfo, itemsToOrder))

      if (data && (data.status === 200 || data.status === 201) && data.err === false) {
        message('Данные были переданы. Ожидайте, с вами свяжется менеджер')
        dispatch(addItemToProduct(itemsToOrder))
      } else if ((data.status !== 200 || data.status !== 201) && data.err === true) {
        error(data.text || 'Что то пошло не так, попробуйте снова!')
      } else {
        error('Прооблема с подключением к базе данных, обратитесь к менеджеру')
      }
      dispatch(removeAllItemStore())
    }
    setCreateOrder(false)
  };

  React.useEffect(() => {
    setCurrentOrder(String(Math.floor(Math.random() * (10000 - 999)) + 1000))
    return () => {
      setCurrentOrder('0')
    }
  }, [])


  return (
    <div className={classes.root}>
      <h3>Заказ № {currentOrder}</h3>
      <p>Спасибо что выбрали именно нас!</p>
      <Divider />
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {index === 0
                ? <BasketForm handleNext={handleNext} />
                : <PayAndMarch activeStep={activeStep} handleCreate={handleCreate} handleBack={handleBack} />
              }
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}

export default CreateOrder
