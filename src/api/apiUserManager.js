import axios from 'axios'

axios.defaults.baseURL = 'https://fda-services.herokuapp.com/v1.0'

export default class UserPassword {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
    }
    //Change Password
    getPasswordbyId(account_id, cb) {
        console.log("##########GET PASSWORD" + account_id)
        axios.get('secured/accounts/admin/' + account_id).then((result) => {
                console.log("###API### GET PASSWORD" + JSON.stringify(result.data))
                if (result.data.success) {
                    cb(result.data.model)
                } else {
                    cb(err)
                }
            })
            .catch(err => {
                cb(err)
            })
    }

    changePassword(modified_account, cb) {
        axios.post('secured/accounts/admin/password', modified_account).then((result) => {
                console.log("api############# Edit PASSWORD" + JSON.stringify(result.data.model))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }


}