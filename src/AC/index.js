import {
    GET_PRODUCT,
    GET_CUSTOMER
} from '../constants'

export function getProduct() {
    return {
        type: GET_PRODUCT,
        callAPI: '/api/products'
    }
}

export function getCustomer() {
    return {
        type: GET_CUSTOMER,
        callAPI: '/api/customers'
    }
}







