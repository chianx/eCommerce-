import {combineReducers, applyMiddleware} from "redux"
import {legacy_createStore as createStore} from 'redux'
import { productDetailsReducer, productReducer } from "./reducers/productReducer";
import {thunk} from "redux-thunk"
const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
})

let initialState = {};
const middleware = [thunk];

const store = createStore(reducer, initialState, applyMiddleware(...middleware));

export default store;