import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI

export default class CompanyActivityType {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getCompanyActivity(cb) {

        axios.get('core/activity').then((result) => {
                console.log("###API### GET ACTIVITY")
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

    addCompanyActivity(new_activity, cb) {
        console.log("api############# add activity" + JSON.stringify(new_activity))
        axios.post('core/activity', new_activity).then((result) => {
                console.log("api############# ADD ACTIVITY")
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editCompanyActivity(modified_activity, cb) {
        var id = modified_activity._id
        axios.post('core/activity/' + id, modified_activity).then((result) => {
                console.log("api############# Edit ACTIVITY" + JSON.stringify(modified_activity))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }
}