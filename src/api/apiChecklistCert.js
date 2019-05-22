import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI

export default class ChecklistType {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getChecklistCert(cb) {

        axios.get('certificates/checklist').then((result) => {
                console.log("###API### GET CHECKLIST Cert")
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

    addChecklistCert(new_checklist, cb) {
        console.log("api############# add Checklist" + JSON.stringify(new_checklist))
        axios.post('certificates/checklist', new_checklist).then((result) => {
                console.log("api############# ADD CHECKLIST")
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editChecklistCert(modified_checklist, cb) {
        var id = modified_checklist._id
        axios.post('certificates/checklist/' + id, modified_checklist).then((result) => {
                console.log("api############# Edit CHECKLIST" + JSON.stringify(modified_checklist))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }
}