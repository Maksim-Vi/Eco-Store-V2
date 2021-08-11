
import thunkMiddleware from "redux-thunk";
import { combineReducers, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import {createWrapper} from 'next-redux-wrapper'

import InitReducer from "./reducers/initial-reducer";
import StoreReducer from "./reducers/store-reducer";
import PopularReducer from "./reducers/popular-reducer";
import BasketReducer from "./reducers/basket-reducer";
import FilterReducer from "./reducers/filter-reducer";
import AnswerFormReducer from "./reducers/form-reducer";


let reducers = combineReducers({
    init: InitReducer,
    store: StoreReducer,
    popular: PopularReducer,
    basket:BasketReducer,
    filter: FilterReducer,
    answerForm: AnswerFormReducer
});

const store = createStore(reducers,composeWithDevTools(applyMiddleware(thunkMiddleware)));


const makeStore = context => createStore(reducers);
export const wrapper = createWrapper(makeStore, {debug: true});

export default store;