import {
    GET_PRODUCT,
    GET_CUSTOMER
} from '../constants'

export default store => next => action => {
    const {callAPI, type} = action;
    
    if (!callAPI) return next(action);
    
    switch (type) {
        case GET_PRODUCT:
            fetch(callAPI)
                .then(res => res.json())
                .then(response => next({...action, products: response }))
                .catch(error => console.log(error));
            break;
       
        case GET_CUSTOMER:
            fetch(callAPI)
                .then(res => res.json())
                .then(response => next({...action, customers: response }))
                .catch(error => console.log(error));    
    }
    
}


