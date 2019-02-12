import axios from 'axios'

axios.defaults.baseURL = 'https://fda-services.herokuapp.com/v1.0'

export default class RegionType {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
    }

    getRegion(cb) {

        axios.get('core/region').then((result) => {
                console.log("###API###")
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

    addRegion(new_region, cb) {
        console.log("api#############" + JSON.stringify(new_pregion))
        axios.post('core/region', new_region).then((result) => {
                console.log("api#############")
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editProduct(modified_region, cb) {
        var id = modified_region._id
        axios.post('core/region/' + id, modified_region).then((result) => {
                console.log("api#############" + JSON.stringify(modified_region))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

}