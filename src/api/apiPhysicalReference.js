import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI

export default class PhysicalReferenceType {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getPhysicalReference(cb) {

        axios.get('core/specifications/reference').then((result) => {
                console.log("###API### GET PhysicalReference")
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

    addPhysicalReference(new_physical_reference, cb) {
        console.log("api############# add PhysicalReference" + JSON.stringify(new_physical_reference))
        axios.post('core/specifications/reference', new_physical_reference).then((result) => {
                console.log("api############# ADD PhysicalReference")
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editPhysicalReference(modified_physical_reference, cb) {
        var id = modified_physical_reference._id
        axios.post('core/specifications/reference/' + id, modified_physical_reference).then((result) => {
                console.log("api############# Edit PhysicalReference" + JSON.stringify(modified_physical_reference))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }
}