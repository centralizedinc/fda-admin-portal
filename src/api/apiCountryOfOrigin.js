import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI

export default class CountryOfOriginType {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getCountryOfOrigin(cb) {

        axios.get('core/country').then((result) => {
                console.log("###API### GET COUNTRY")
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

    addCountryOfOrigin(new_country, cb) {
        console.log("api############# add country" + JSON.stringify(new_country))
        axios.post('core/country', new_country).then((result) => {
                console.log("api############# ADD COUNTRY")
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editCountryOfOrigin(modified_country, cb) {
        var id = modified_country._id
        axios.post('core/country/' + id, modified_country).then((result) => {
                console.log("api############# Edit COUNTRY" + JSON.stringify(modified_country))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }
}