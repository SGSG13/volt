import {
    GET_PRODUCT
} from '../constants'

export function getProduct() {
    return {
        type: GET_PRODUCT,
        callAPI: '/api/products'
    }
}






