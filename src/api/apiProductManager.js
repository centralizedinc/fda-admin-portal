import axios from 'axios'

axios.defaults.baseURL = 'https://fda-services.herokuapp.com/v1.0'

export default class ProductType {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
    }

    getProduct(cb) {

        axios.get('lto-api/resource/product_type').then((result) => {
                if (result.data.success) {
                    cb(result.data.model)
                } else {
                    cb(null, result.data.errors)
                }
            })
            .catch(err => {
                cd(null, err)
            })
    }

    getPrimary(cb) {
        axios.get('lto-api/resource/primary/:product').then((result) => {
                if (result.data.success) {
                    cb(result.data.model)
                } else {
                    cb(null, result.data.errors)
                }
            })
            .catch(err => {
                cd(null, err)
            })
    }

    getSecondary(cb) {
        axios.get('lto-api/resource/secondary/:primary').then((result) => {
                if (result.data.success) {
                    cb(result.data.model)
                } else {
                    cb(null, result.data.errors)
                }
            })
            .catch(err => {
                cd(null, err)
            })
    }

    getAdditional(cb) {
        axios.get('lto-api/resource/additional/:primary').then((result) => {
                if (result.data.success) {
                    cb(result.data.model)
                } else {
                    cb(null, result.data.errors)
                }
            })
            .catch(err => {
                cd(null, err)
            })
    }

    getDeclaredCapital(cb) {
        axios.get('lto-api/resource/declared/:primary"').then((result) => {
                if (result.data.success) {
                    cb(result.data.model)
                } else {
                    cb(null, result.data.errors)
                }
            })
            .catch(err => {
                cd(null, err)
            })
    }

    getRegion(cb) {
        axios.get('lto-api/resource/region').then((result) => {
                if (result.data.success) {
                    cb(result.data.model)
                } else {
                    cb(null, result.data.errors)
                }
            })
            .catch(err => {
                cd(null, err)
            })
    }

    getProvince(cb) {
        axios.get('lto-api/resource/province').then((result) => {
                if (result.data.success) {
                    cb(result.data.model)
                } else {
                    cb(null, result.data.errors)
                }
            })
            .catch(err => {
                cd(null, err)
            })
    }
    getCity(cb) {
        axios.get('lto-api/resource/city').then((result) => {
                if (result.data.success) {
                    cb(result.data.model)
                } else {
                    cb(null, result.data.errors)
                }
            })
            .catch(err => {
                cd(null, err)
            })
    }

    getZipCode(cb) {
        axios.get('lto-api/resource/zip-code').then((result) => {
                if (result.data.success) {
                    cb(result.data.model)
                } else {
                    cb(null, result.data.errors)
                }
            })
            .catch(err => {
                cd(null, err)
            })
    }


}