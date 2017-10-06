export function createProductApi(url, success, product) {
    fetch(url, {
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
        .then(res => success())
        .catch(error => console.log(error));
}

export function editProductApi(url, success, product) {
    fetch(url, {
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
        .then(res => success())
        .catch(error => console.log(error));
}

export function deleteProductApi(url, success) {
    fetch(url, {
        method: "delete",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => success())
        .catch(error => console.log(error));
}