import axios from 'axios'

export default function setAuthToken(token) {
    const instance = axios.create({
        baseURL: 'https://fda-services.herokuapp.com/v1.0',
        // baseURL: 'http://localhost:3000/v1.0',
        credentials: false
    })

    instance.defaults.headers.common['access_token'] = `${token}`
    // instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    instance.defaults.headers.common['Content-Type'] = 'application/json'
    // instance.defaults.headers.common['Access-Control-Allow-Credentials'] = 'false';
    // instance.defaults.headers.common['Access-Control-Max-Age'] = '100'
    return instance
}