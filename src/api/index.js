export function createItemApi(url, success, item) {
    fetch(url, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            ...item
        })
    })
        .then(res => success())
        .catch(error => console.log(error));
}

export function editItemApi(url, success, item) {
    fetch(url, {
        method: "put",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            ...item
        })
    })
        .then(res => success())
        .catch(error => console.log(error));
}

export function deleteItemApi(url, success) {
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