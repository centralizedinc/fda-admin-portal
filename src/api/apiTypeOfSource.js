import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI

export default class TypeOfSourceType {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getTypeOfSource(cb) {

        axios.get('core/typeofsource').then((result) => {
                console.log("###API### GET TypeOfSource")
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

    addTypeOfSource(new_typeofsource, cb) {
        console.log("api############# add typeofsource" + JSON.stringify(new_typeofsource))
        axios.post('core/typeofsource', new_typeofsource).then((result) => {
                console.log("api############# ADD TyepeOFSource")
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editTypeOfSource(modified_typeofsource, cb) {
        var id = modified_typeofsource._id
        axios.post('core/typeofsource/' + id, modified_typeofsource).then((result) => {
                console.log("api############# Edit SOURCE" + JSON.stringify(modified_typeofsource))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }
}