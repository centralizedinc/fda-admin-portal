import axios from 'axios'

axios.defaults.baseURL = 'https://fda-services.herokuapp.com/v1.0'

export default class ApproverType {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
    }

    getApprover(cb) {

        axios.get('core/approver').then((result) => {
                console.log("###API### GET APPROVER")
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

    addApprover(new_approver, cb) {
        console.log("api############# add Approver" + JSON.stringify(new_approver))
        axios.post('core/approver', new_approver).then((result) => {
                console.log("api############# ADD APPROVER")
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editApprover(modified_approver, cb) {
        var id = modified_approver._id
        axios.post('core/approver/' + id, modified_approver).then((result) => {
                console.log("api############# EditApprover" + JSON.stringify(modified_approver))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }
}

