import axios from 'axios'

axios.defaults.baseURL = 'https://fda-services.herokuapp.com/v1.0'

export default class Fees {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
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
        axios.post('payments/fees', new_fee).then((result) => {
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