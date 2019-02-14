import axios from 'axios'

axios.defaults.baseURL = 'https://fda-services.herokuapp.com/v1.0'

export default class RegionType {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
    }

    //REGION
    getRegion(cb) {
        axios.get('core/regions').then((result) => {
                console.log("###API:REGION###")
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
        console.log("api#############" + JSON.stringify(new_region))
        axios.post('core/regions', new_region).then((result) => {
                console.log("api#############")
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editRegion(modified_region, cb) {
        var id = modified_region._id
        axios.post('core/regions/' + id, modified_region).then((result) => {
                console.log("api#############" + JSON.stringify(modified_region))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    //PROVINCE

    getProvince(cb) {
        axios.get('core/provinces').then((result) => {
                console.log("###API:PROVINCE###")
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

    addProvince(new_province, cb) {
        console.log("api#############" + JSON.stringify(new_province))
        axios.post('core/provinces', new_province).then((result) => {
                console.log("api#############new_province: " + JSON.stringify(result.data))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editProvince(modified_province, cb) {
        var id = modified_province._id
        axios.post('core/provinces/' + id, modified_province).then((result) => {
                console.log("api#############sss" + JSON.stringify(result.data))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }
    //CITY

    getCity(cb) {
        axios.get('core/city').then((result) => {
                console.log("###API:CITY###")
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

    addCity(new_city, cb) {
        console.log("api#############" + JSON.stringify(new_city))
        axios.post('core/city', new_city).then((result) => {
                console.log("api#############")
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editCity(modified_city, cb) {
        var id = modified_city._id
        axios.post('core/city/' + id, modified_city).then((result) => {
                console.log("api#############" + JSON.stringify(modified_city))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

}