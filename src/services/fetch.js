export default function request(url, method = 'get', body = false) {
    const options = {
        method: method.toUpperCase(),
        headers: {
            'Content-Type': 'application/json'
        },
    }

    if (body !== false) options['body'] = JSON.stringify(body)

    return fetch(url, {
        ...options
    })
}