import {
    GET_INVOICE
} from '../constants'


export default (state = [], action) => {
    const {type, invoices} = action;

    switch (type) {
        case GET_INVOICE:
            return invoices;

        default:
            return state;
    }
}
