import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI

export default class LoginType {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
    }

    getLogin(cb) {

        axios.get('public/accounts/auth/active').then((result) => {
                console.log("###API### GET ADMIN ACTIVE AUTH")
                if (result.data.success) {
                    cb(result.data.errors, result.data.model)
                } else {
                    cb(result.data.errors)
                }
            })
            .catch(err => {
                cb(err)
            })
    }

    login(credentials, cb) {
        console.log('JSON.stringify(credentials) :', JSON.stringify(credentials));
        axios.post('public/accounts/auth/admin/', credentials).then((result) => {
                console.log('JSON.stringify(result.data) :', JSON.stringify(result.data));
                if (result.data.success) {
                    cb(result.data.errors, result.data.model)
                } else {
                    cb(result.data.errors)
                }
            })
            .catch(err => {
                cb(err)
            })
    }

}