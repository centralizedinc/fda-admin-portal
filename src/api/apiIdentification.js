import axios from 'axios'

axios.defaults.baseURL = 'https://fda-services.herokuapp.com/v1.0'

export default class IdentificationType {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
    }

    getIdentification(cb) {
        axios.get('core/identification').then((result) => {
                console.log("###API:Identification###")
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

    addIdentification(new_identification, cb) {
        console.log("api#############" + JSON.stringify(new_identification))
        axios.post('core/identification', new_identification).then((result) => {
                console.log("api#############")
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editIdentification(modified_identification, cb) {
        var id = modified_identification._id
        axios.post('core/identification/' + id, modified_identification).then((result) => {
                console.log("api#############" + JSON.stringify(modified_identification))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }
}