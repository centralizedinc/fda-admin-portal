import axios from 'axios'

axios.defaults.baseURL = 'https://fda-services.herokuapp.com/v1.0'

export default class ProductType {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
    }

    getProduct(cb) {

        axios.get('core/products').then((result) => {
                if (result.data.success) {

                    console.log("###API###" + JSON.stringify(result.data.model))
                    cb(result.data.model)
                } else {
                    cb(null, result.data.errors)
                }
            })
            .catch(err => {
                cb(null, err)
            })
    }

    addProduct(new_product, cb) {
        console.log("api#############" + JSON.stringify(new_product))
        axios.post('core/products', new_product).then((result) => {
                console.log("api#############" + JSON.stringify(new_product))
            })
            .catch(err => {
                cb(null, err)
            })
    }

    editProduct(id, modified_product, cb) {
        var id = modified_product._id
        axios.post('core/products/' + id, modified_product).then((result) => {
                console.log("api#############" + JSON.stringify(modified_product))
            })
            .catch(err => {
                cb(null, err)
            })
    }

    getPrimary(cb) {
        axios.get('core/primary').then((result) => {
                console.log("api#############")
                if (result.data.success) {
                    cb(result.data.model)
                } else {
                    cb(null, result.data.errors)
                }
            })
            .catch(err => {
                cb(null, err)
            })
    }

    addPrimary(new_primary, cb) {
        console.log("api#############" + JSON.stringify(new_primary))
        axios.post('core/primary', new_primary).then((result) => {
                console.log("api#############" + JSON.stringify(new_primary))
            })
            .catch(err => {
                cb(null, err)
            })
    }

    editPrimary(id, modified_primary, cb) {
        var id = modified_primary._id
        axios.post('core/primary/' + id, modified_primary).then((result) => {
                console.log("api#############" + JSON.stringify(modified_primary))
            })
            .catch(err => {
                cb(null, err)
            })
    }


    getSecondary(cb) {
        axios.get('core/secondary').then((result) => {
                if (result.data.success) {
                    cb(result.data.model)
                } else {
                    cb(null, result.data.errors)
                }
            })
            .catch(err => {
                cb(null, err)
            })
    }

    getAdditional(cb) {
        axios.get('core/additional').then((result) => {
                if (result.data.success) {
                    cb(result.data.model)
                } else {
                    cb(null, result.data.errors)
                }
            })
            .catch(err => {
                cb(null, err)
            })
    }

    addAdditional(new_additional, cb) {
        console.log("api#############" + JSON.stringify(new_additional))
        axios.post('core/additional', new_additional).then((result) => {
                console.log("api#############" + JSON.stringify(new_additional))
            })
            .catch(err => {
                cb(null, err)
            })
    }

    editAdditional(modified_additional, cb) {
        var id = modified_additional._id
        axios.post('core/additional/' + id, modified_additional).then((result) => {
                console.log("api#############" + JSON.stringify(modified_additional))
            })
            .catch(err => {
                cb(null, err)
            })
    }

    getDeclaredCapital(cb) {
        axios.get('core/declared').then((result) => {
                if (result.data.success) {
                    cb(result.data.model)
                } else {
                    cb(null, result.data.errors)
                }
            })
            .catch(err => {
                cb(null, err)
            })
    }

    addDeclaredCapital(new_declared, cb) {
        console.log("api#############" + JSON.stringify(new_declared))
        axios.post('core/declared', new_declared).then((result) => {
                console.log("api#############" + JSON.stringify(new_declared))
                cb(result.data.model)
            })
            .catch(err => {
                cb(null, err)
            })
    }

    editDeclaredCapital(modified_declared, cb) {
        var id = modified_declared._id
        axios.post('core/declared/' + id, modified_declared).then((result) => {
                console.log("api#############" + JSON.stringify(modified_declared))
                cb(result.data.model)
            })
            .catch(err => {
                cb(null, err)
            })
    }


    // getRegion(cb) {
    //     axios.get('lto-api/resource/region').then((result) => {
    //             if (result.data.success) {
    //                 cb(result.data.model)
    //             } else {
    //                 cb(null, result.data.errors)
    //             }
    //         })
    //         .catch(err => {
    //             cd(null, err)
    //         })
    // }

    // getProvince(cb) {
    //     axios.get('lto-api/resource/province').then((result) => {
    //             if (result.data.success) {
    //                 cb(result.data.model)
    //             } else {
    //                 cb(null, result.data.errors)
    //             }
    //         })
    //         .catch(err => {
    //             cd(null, err)
    //         })
    // }
    // getCity(cb) {
    //     axios.get('lto-api/resource/city').then((result) => {
    //             if (result.data.success) {
    //                 cb(result.data.model)
    //             } else {
    //                 cb(null, result.data.errors)
    //             }
    //         })
    //         .catch(err => {
    //             cd(null, err)
    //         })
    // }

    // getZipCode(cb) {
    //     axios.get('lto-api/resource/zip-code').then((result) => {
    //             if (result.data.success) {
    //                 cb(result.data.model)
    //             } else {
    //                 cb(null, result.data.errors)
    //             }
    //         })
    //         .catch(err => {
    //             cd(null, err)
    //         })
    // }


}