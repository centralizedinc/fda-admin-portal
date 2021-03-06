import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI

export default class Fees {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getFees(cb) {

        axios.get('payments/fees').then((result) => {
                console.log("###API###")
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

    addFees(new_fees, cb) {
        console.log("api#############" + JSON.stringify(new_fees))
        axios.post('payments/fees', new_fees).then((result) => {
                console.log("api#############:Added:")
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editFees(modified_fees, cb) {
        var id = modified_fees._id
        axios.post('payments/fees/' + id, modified_fees).then((result) => {
                console.log("api#############:Edited" + JSON.stringify(modified_fees))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }
}