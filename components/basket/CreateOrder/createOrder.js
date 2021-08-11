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
import { addItemToProduct, clearFullForm, postFormBasket } from '../../../redux/reducers/form-reducer';
import { uniqBy } from 'lodash';
import { removeAllItemStore } from '../../../redux/reducers/basket-reducer';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '75%',
    left: '10%',
    top: '5%',
    zIndex: '10',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      top: '5%',
      left: '3%',
      width: '93%',
    },
    '& .MuiStepper-vertical': {
      borderRadius: '10px',
      [theme.breakpoints.down('sm')]: {
        overflowY: 'scroll',
        height: '500px',
        '&::-webkit-scrollbar': {
          width: '0.1em'
        },
        '&::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.1)',
          outline: '1px solid slategrey'
        }
      },
      '& .MuiStepConnector-root': {
       flex: 'none'
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
  return ['Заполнить форму заказа. *Имя; *Телефон; Email',
    'Заполнить форму для получения. *Способ доставки; *Способ оплаты; *Данные (в случае отправки почтой)'];
}

const CreateOrder = ({ setCreateOrder }) => {
  const classes = useStyles();

  const dispatch = useDispatch()
  const form = useSelector(state => state.answerForm)
  const basketItem = useSelector(state => state.basket)

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  let basketItems = uniqBy(basketItem.items, i=>i.id)

  let item = basketItems.map(item => {
    return {
      id: item.id,
      name: item.name,
      cost: (item.price - item.salePrice),
      count: basketItem.items.reduce((count, i) => {
        return count + (i.id === item.id ? 1 : 0)
      }, 0)
    }
  })

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

  const handleCreate = () => {
    
    if (item.length === 0) {
      error('Выберите товар!')
    } else {
      dispatch(postFormBasket(form.firstName, form.Email, form.phone, form.promocode, form.pay, form.post, form.postInfo, item))
      dispatch(addItemToProduct(item))
      dispatch(removeAllItemStore())
      message('Данные были переданы. Ожидайте, с вами свяжется менеджер')
    }
    setCreateOrder(false)
  };

  return (
    <div className={classes.root}>
      <span className={classes.ItemClose} onClick={() => { setCreateOrder(false) }}>{
        <p>&times;</p>
      }</span>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <div>
                {index === 0
                  ? <BasketForm handleNext={handleNext} />
                  : <PayAndMarch activeStep={activeStep} handleCreate={handleCreate} handleBack={handleBack} />
                }
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

export default CreateOrder