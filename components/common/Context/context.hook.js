import {createContext} from 'react';

const noop = () =>{}

export const AuchContext = createContext({
    token: null,
    userId: null,
    isAuth: false,
    login: noop,
    logout: noop,
    isAuthorization: false
})

export const AuchContextItem = createContext({
   itemPopular:null,
   items:null,
   id:null,
   itemsProduct: noop, 
   itemsProductPatchId: noop, 
})