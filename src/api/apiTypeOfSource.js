import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI

export default class TypeOfSourceType {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getTypeOfSource(cb) {

        axios.get('core/source').then((result) => {
                console.log("###API### GET SOURCE")
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

    addTypeOfSource(new_source, cb) {
        console.log("api############# add source" + JSON.stringify(new_source))
        axios.post('core/source', new_source).then((result) => {
                console.log("api############# ADD SOURCE")
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editTypeOfSource(modified_source, cb) {
        var id = modified_source._id
        axios.post('core/source/' + id, modified_source).then((result) => {
                console.log("api############# Edit SOURCE" + JSON.stringify(modified_source))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }
}