import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI

export default class DesignationType {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    //DESIGNATION
    getDesignation(cb) {
        axios.get('core/designation').then((result) => {
                console.log("###API:DESIGNATION###")
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

    addDesignation(new_designation, cb) {
        console.log("api#############" + JSON.stringify(new_designation))
        axios.post('core/designation', new_designation).then((result) => {
                console.log("api#############")
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editDesignation(modified_designation, cb) {
        var id = modified_designation._id
        axios.post('core/designation/' + id, modified_designation).then((result) => {
                console.log("api#############" + JSON.stringify(modified_designation))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }
}