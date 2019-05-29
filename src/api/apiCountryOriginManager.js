import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI

export default class CountryOriginType {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getCountryOrigin(cb) {

        axios.get('core/origins').then((result) => {
                console.log("###API### GET CountryOrigin")
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

    addCountryOrigin(new_country_origin, cb) {
        console.log("api############# add countryorigin" + JSON.stringify(new_country_origin))
        axios.post('core/origins', new_country_origin).then((result) => {
                console.log("api############# ADD CountryOrigin")
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editCountryOrigin(modified_country_origin, cb) {
        var id = modified_country_origin._id
        axios.post('core/origins/' + id, modified_country_origin).then((result) => {
                console.log("api############# Edit CountryOrigin" + JSON.stringify(modified_country_origin))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }
}