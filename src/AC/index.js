import {
    GET_PRODUCT,
    GET_CUSTOMER,
    GET_INVOICE
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

export function getInvoice () {
    return {
        type: GET_INVOICE,
        callAPI: '/api/invoices'
    }
}








