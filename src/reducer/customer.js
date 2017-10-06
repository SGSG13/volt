import {
    GET_CUSTOMER
} from '../constants'


export default (state = [], action) => {
    const {type, customers} = action;

    switch (type) {
        case GET_CUSTOMER:
            return customers;

        default:
            return state;
    }
}