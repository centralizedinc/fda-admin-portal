import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI

export default class SourceType {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getSource(cb) {

        axios.get('core/source').then((result) => {
                console.log("###API### GET Source")
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

    addSource(new_type_source, cb) {
        console.log("api############# add source" + JSON.stringify(new_type_source))
        axios.post('core/source', new_type_source).then((result) => {
                console.log("api############# ADD Source")
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editSource(modified_type_source, cb) {
        var id = modified_type_source._id
        axios.post('core/source/' + id, modified_type_source).then((result) => {
                console.log("api############# Edit Source" + JSON.stringify(modified_type_source))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }
}