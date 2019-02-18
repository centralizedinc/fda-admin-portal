import axios from 'axios'

axios.defaults.baseURL = 'https://fda-services.herokuapp.com/v1.0'

export default class LoginType {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
    }

    getLogin(cb) {

        axios.get('public/accounts/active').then((result) => {
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

    login(cb) {
        axios.post('public/accounts/admin').then((result) => {
                console.log("##POST API### POST USERNAME AND PASSWORD")
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