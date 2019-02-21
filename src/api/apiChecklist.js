import axios from 'axios'

axios.defaults.baseURL = 'https://fda-services.herokuapp.com/v1.0'

export default class ChecklistType {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
    }

    getChecklist(cb) {

        axios.get('lto-api/checklist').then((result) => {
                console.log("###API### GET CHECKLIST")
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

    addChecklist(new_checklist, cb) {
        console.log("api############# add Checklist" + JSON.stringify(new_checklist))
        axios.post('lto-api/checklist', new_checklist).then((result) => {
                console.log("api############# ADD CHECKLIST")
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editChecklist(modified_checklist, cb) {
        var id = modified_checklist._id
        axios.post('lto-api/checklist/' + id, modified_checklist).then((result) => {
                console.log("api############# Edit CHECKLIST" + JSON.stringify(modified_checklist))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }
}