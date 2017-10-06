import {combineReducers} from 'redux'
import product from './product'
import customer from './customer'
import invoice from './invoice'

export default combineReducers({
    product, customer, invoice
});