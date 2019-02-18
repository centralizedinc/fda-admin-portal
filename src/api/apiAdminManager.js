import axios from 'axios'

axios.defaults.baseURL = 'https://fda-services.herokuapp.com/v1.0'

export default class AdminType {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
    }
//admin
    getAdmin(cb) {

        axios.get('secured/accounts/admin').then((result) => {
                console.log("###API### GET ADMIN")
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

    addAdmin(new_admin, cb) {
        console.log("api############# add admin" + JSON.stringify(new_admin))
        axios.post('secured/accounts/admin', new_admin).then((result) => {
                console.log("api############# ADD ADMIN")
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editAdmin(modified_admin, cb) {
        var id = modified_admin._id
        axios.post('secured/accounts/admin/' + id, modified_admin).then((result) => {
                console.log("api############# Edit Admin" + JSON.stringify(modified_admin))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

   
}