import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI

export default class VitaminsType {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getVitamins(cb) {

        axios.get('core/vitamins').then((result) => {
                console.log("###API### GET vitamins")
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

    addVitamins(new_vitamins, cb) {
        console.log("api############# add vitamins" + JSON.stringify(new_vitamins))
        axios.post('core/vitamins', new_vitamins).then((result) => {
                console.log("api############# ADD vitamins")
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editVitamins(modified_vitamins, cb) {
        var id = modified_vitamins._id
        axios.post('core/vitamins/' + id, modified_vitamins).then((result) => {
                console.log("api############# Edit vitamins" + JSON.stringify(modified_vitamins))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }
}