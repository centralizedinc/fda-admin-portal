import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI

export default class MineralsType {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getMinerals(cb) {

        axios.get('core/minerals').then((result) => {
                console.log("###API### GET minerals")
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

    addMinerals(new_minerals, cb) {
        console.log("api############# add minerals" + JSON.stringify(new_minerals))
        axios.post('core/minerals', new_minerals).then((result) => {
                console.log("api############# ADD minerals")
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editMinerals(modified_minerals, cb) {
        var id = modified_minerals._id
        axios.post('core/minerals/' + id, modified_minerals).then((result) => {
                console.log("api############# Edit minerals" + JSON.stringify(modified_minerals))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }
}