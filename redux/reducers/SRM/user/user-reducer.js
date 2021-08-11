import { CLEAR_USER, DELETE_SRM_TOKEN, SET_SRM_SIGNIN, SET_SRM_TOKEN } from "./action";

let initialState = {
    login: {
        email: '',
        password:''
    },
    register:{
        FirstName: '',
        LastName:'',
        email: '',
        password:'' 
    },
    token:''
};

const userReducer = (state = initialState, action) =>{
    switch (action.type) { 
        case SET_SRM_TOKEN:{
            return {...state,token: action.token}
        }  
        case DELETE_SRM_TOKEN:{
            return {...state,token: ''}
        }  
        case SET_SRM_SIGNIN:{
            return {
                ...state, 
                login: {
                   email: action.email,
                   password: action.password
                }
            }
        } 
        default:
            return state;
    }
} 


export default userReducer;