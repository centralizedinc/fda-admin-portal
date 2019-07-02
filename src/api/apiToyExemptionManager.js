import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI

export default class ToyExemptionType {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getToyExemption(cb) {

        axios.get('core/toy/exemption').then((result) => {
                console.log("###API### GET toy_exemption")
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

    addToyExemption(new_toy_exemption, cb) {
        console.log("api############# add toy_exemption" + JSON.stringify(new_toy_exemption))
        axios.post('core/toy/exemption', new_toy_exemption).then((result) => {
                console.log("api############# ADD toy_exemption")
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editToyExemption(modified_toy_exemption, cb) {
        var id = modified_toy_exemption._id
        axios.post('core/toy/exemption/' + id, modified_toy_exemption).then((result) => {
                console.log("api############# Edit toy_exemption" + JSON.stringify(modified_toy_exemption))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }
}