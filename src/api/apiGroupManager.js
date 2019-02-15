import axios from 'axios'

axios.defaults.baseURL = 'https://fda-services.herokuapp.com/v1.0'

export default class GroupType {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
    }

    getGroup(cb) {

        axios.get('secured/accounts/admin/fda/group').then((result) => {
                console.log("###API### GET GROUP")
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

    addGroup(new_group, cb) {
        console.log("api############# add group" + JSON.stringify(new_group))
        axios.post('secured/accounts/admin/fda/group', new_group).then((result) => {
                console.log("api############# addgroup")
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editGroup(modified_group, cb) {
        var id = modified_group._id
        axios.post('secured/accounts/admin/fda/group/' + id, modified_group).then((result) => {
                console.log("api############# addgroup" + JSON.stringify(modified_group))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }
}