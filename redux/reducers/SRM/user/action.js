import { postRegisterApi, postSignInApi } from "../../../../API/apiNew"

export const SET_SRM_TOKEN = 'SRM/SET_STM_TOKEN'
export  const setToken = (token) => ({ type: SET_SRM_TOKEN, token })

export const DELETE_SRM_TOKEN = 'SRM/DELETE_SRM_TOKEN'
export  const deleteToken = () => ({ type: DELETE_SRM_TOKEN })


// ------------------------------------------------------------------------------------------------------
export const SET_SRM_SIGNIN = 'SRM/SET_SRM_SIGNIN'
export  const setUserData = (email,password) => ({ type: SET_SRM_SIGNIN, email,password })

export const SRM_Login = (email,password) => async (dispatch) => {
    let data = await postSignInApi(email,password)   
  
    if(data && data.status === 200){
        dispatch(setToken(data.token))
        dispatch(setUserData(email,password))
        return {
            login: true,
            token: data.data.token, 
            userId: data.data.userId
        }
    }
    return {login: false,token: null, userId: null}
} 

export const SRM_Register = (FirstName, LastName,email,password) => async (dispatch) => {
    let data = await postRegisterApi(FirstName, LastName,email,password)   
  
    if(data && data.status === 200){
        return {
            create: true,
            data: data,
        }
    }
    return { create: false, data: []}
} 