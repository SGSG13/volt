export function createProductApi(callAPI, getting, product) {
    fetch(callAPI, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            name: product.name,
            price: product.price
        })
    })
        .then(res => getting())
        .catch(error => console.log(error));
}

export function editProductApi(callAPI, getting, product) {
    fetch(callAPI, {
        method: "put",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            name: product.name,
            price: product.price
        })
    })
        .then(res => getting())
        .catch(error => console.log(error));
}

export function deleteProductApi(callAPI, getting) {
    fetch(callAPI, {
        method: "delete",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => getting())
        .catch(error => console.log(error));
}