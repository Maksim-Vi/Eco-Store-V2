import { postSignInApi } from "../../../../API/apiNew"

export const SET_SRM_TOKEN = 'SRM/SET_STM_TOKEN'
export  const setToken = (token) => ({ type: SET_SRM_TOKEN, token })

export const DELETE_SRM_TOKEN = 'SRM/DELETE_SRM_TOKEN'
export  const deleteToken = () => ({ type: DELETE_SRM_TOKEN })


// ------------------------------------------------------------------------------------------------------
export const SET_SRM_SIGNIN = 'SRM/SET_SRM_SIGNIN'
export  const setUserData = (email,password) => ({ type: SET_SRM_SIGNIN, email,password })

export const SRM_Login = (email,password) => async (dispatch) => {
    let data = await postSignInApi(email,password)   
    if(data){
        dispatch(setToken(data.token))
        dispatch(setUserData(email,password))
        return {
            login: true,
            token: data.token, 
            userId: data.userId
        }
    }
    return {login: false}
} 
