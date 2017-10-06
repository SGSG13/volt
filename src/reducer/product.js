import {GET_PRODUCT} from '../constants'

export default (state = [], action) => {
    const {type, products} = action;

    switch (type) {
        case GET_PRODUCT:
            return products;
        
        default:
            return state;
    }
}
