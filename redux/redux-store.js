
import { useMemo } from "react";
import thunkMiddleware from "redux-thunk";
import { combineReducers, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

import InitReducer from "./reducers/initial-reducer";
import StoreReducer from "./reducers/store-reducer";
import PopularReducer from "./reducers/popular-reducer";
import BasketReducer from "./reducers/basket-reducer";
import FilterReducer from "./reducers/filter-reducer";
import AnswerFormReducer from "./reducers/form-reducer";

import storageSession from 'redux-persist/lib/storage/session'
import { persistReducer } from 'redux-persist'
import userReducer from "./reducers/SRM/user/user-reducer";
import { setToken } from "./reducers/SRM/user/action";
import productsReducer from "./reducers/SRM/products/products-reducer";
import topReducer from "./reducers/SRM/top/top-reducer";

const persistConfig = {
  key: 'state',
  storage: storageSession,
}

let store

let reducers = combineReducers({
  init: InitReducer,
  store: StoreReducer,
  popular: PopularReducer,
  basket: BasketReducer,
  filter: FilterReducer,
  answerForm: AnswerFormReducer,

  CRM_user: userReducer,
  CRM_products: productsReducer,
  CRM_top: topReducer,
}
);

const persistedReducer = persistReducer(persistConfig, reducers)

function initStore(initialState) {
  if (process.env.NODE_ENV !== 'production') {
    return createStore(persistedReducer,initialState,composeWithDevTools(applyMiddleware(thunkMiddleware)))
  } else {
    return createStore(persistedReducer,initialState, applyMiddleware(thunkMiddleware))
  }

}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  let currentState = store.getState();
  store.subscribe(() => {
    // let previousState = currentState;
    // currentState = store.getState();
    // if the token changes set the value in localStorage and axios headers
    // if (previousState.SRM_user.token !== currentState.SRM_user.token) {
    //   const token = currentState.SRM_user.token;
    //   setToken(token);
    // }

  });
  return _store
}


export function useStore(initialState) {
  return useMemo(() => initializeStore(initialState), [initialState])
}
