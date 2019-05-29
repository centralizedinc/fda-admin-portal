import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI

export default class ProductSpecificationsType {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getProductSpecifications(cb) {

        axios.get('core/specifications').then((result) => {
                console.log("###API### GET ProductSpecifications")
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

    addProductSpecifications(new_product_specifications, cb) {
        console.log("api############# add ProductSpecifications" + JSON.stringify(new_product_specifications))
        axios.post('core/specifications', new_product_specifications).then((result) => {
                console.log("api############# ADD ProductSpecifications")
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editProductSpecifications(modified_product_specifications, cb) {
        var id = modified_product_specifications._id
        axios.post('core/specifications/' + id, modified_product_specifications).then((result) => {
                console.log("api############# Edit ProductSpecifications" + JSON.stringify(modified_product_specifications))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }
}