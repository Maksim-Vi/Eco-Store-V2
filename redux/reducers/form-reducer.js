import {postFormStoreApi,postFormStoreBasketApi} from '../../API/apiNew'

const SET_ANSWER_FORM = "SET_ANSWER_FORM"
const ADD_ITEM_PRODUCT = 'ADD_ITEM_PRODUCT'
const SET_NAME = 'SET_NAME'
const SET_EMAIL = 'SET_EMAIL'
const SET_PHONE = 'SET_PHONE'
const SET_PAY = 'SET_PAY'
const SET_POST = 'SET_POST'
const SET_POST_INFO = 'SET_POST_INFO'
const CLEAR_FULL_FORM = 'CLEAR_FULL_FORM'
const SET_PROMOCODE = 'SET_PROMOCODE'

let initialState ={
    product:{},
    firstName: '',
    Email: '',
    subject:'',
    phone: '',
    promocode:'',
    pay:'Оплата на карту', // способ оплаты 
    post:'Новой почтой', // способ доставки 
    postInfo:{
        post_FirstName: '',
        post_LastName: '',
        post_Phone: '',
        post_NumberPost: ''
    } // способ оплаты инфо
}

const AnswerFormReducer = (state=initialState,action) => {
    switch (action.type) {
        case SET_ANSWER_FORM:{
            return {...state, 
                    firstName: action.FirstName,
                    Email: action.Email,
                    subject: action.subject,
                    phone:action.phone,
                    promocode:action.promocode,
                    pay:action.pay,
                    post:action.post,
                    postInfo:action.postInfo}
        }
        case ADD_ITEM_PRODUCT:{
            let product = {
                item: action.item,
                count: action.count
            }
            return {
                ...state,
                product:product
            }
        }
        case SET_PROMOCODE:{
            return {
                ...state,
                promocode:action.promocode
            }
        }
        case SET_NAME:{
            return {
                ...state,
                firstName:action.firstName
            }
        }
        case SET_EMAIL:{
            return {
                ...state,
                Email:action.Email
            }
        }
        case SET_PHONE:{
            return {
                ...state,
                phone:action.phone
            }
        }
        case SET_PAY:{
            return {
                ...state,
                pay:action.pay
            }
        }
        case SET_POST:{
            return {
                ...state,
                post:action.post
            }
        }
        case SET_POST_INFO:{
            return {
                ...state,
                postInfo:action.postInfo
            }
        }
        case CLEAR_FULL_FORM:{
            return {
                ...state,
                product:{},
                firstName: '',
                Email: '',
                subject:'',
                phone: '',
                promocode:'',
                pay:'Оплата наличными',
                post:'Самовывоз',
                postInfo:{
                    post_FirstName: '',
                    post_LastName: '',
                    post_Phone: '',
                    post_NumberPost: ''
                }
            }
        }
        default:
            return state;
    }    
}

export const setAnswerForm = (FirstName,LastName,Email,subject,phone,promocode,pay,post,postInfo) => ({type: SET_ANSWER_FORM, FirstName,LastName,Email,subject,phone,promocode,pay,post,postInfo})

export const clearFullForm = () => ({type: CLEAR_FULL_FORM})
export const setPromocode = (promocode) => ({type: SET_PROMOCODE, promocode})
export const setName = (firstName) => ({type: SET_NAME, firstName})
export const setEmail = (Email) => ({type: SET_EMAIL, Email})
export const setPhone = (phone) => ({type: SET_PHONE, phone})
export const setPay = (pay) => ({type: SET_PAY, pay})
export const setPost = (post) => ({type: SET_POST, post})
export const setPostInfo = (postInfo) => ({type: SET_POST_INFO, postInfo})

export const addItemToProduct = (item, count) => ({type: ADD_ITEM_PRODUCT, item, count })

export const postFormStore = (token,firstName,Email,subject,phone=null,promocode=null,pay=null,post=null,postInfo=null) => async (dispatch) => {
    try {
        postFormStoreApi(token,firstName,Email,subject,phone,promocode,pay,post,postInfo)
        //dispatch(setAnswerForm(firstName,Email,subject,phone,promocode,pay,post,postInfo)); 
        dispatch(clearFullForm())
    } catch (error) {
        console.log(error);
        return Promise.reject()
    }

} 

export const postFormBasket = (FirstName,LastName=null,Email,subject=null,phone,promocode,pay=null,post=null,postInfo=null,item) => async (dispatch) => {
    try {
        let items = JSON.stringify(item)
        let data = await postFormStoreBasketApi(FirstName,LastName,Email,subject,phone,promocode,pay,post,postInfo,items)
        dispatch(clearFullForm())
    } catch (error){
        console.log(error);
        return Promise.reject()
    }
} 

export default AnswerFormReducer;
