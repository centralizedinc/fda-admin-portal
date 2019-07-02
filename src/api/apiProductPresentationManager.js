import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI

export default class ProductPresentationType {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getProductPresentation(cb) {

        axios.get('core/product/presentation').then((result) => {
                console.log("###API### GET product_presentation")
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

    addProductPresentation(new_product_presentation, cb) {
        console.log("api############# add product_presentation" + JSON.stringify(new_product_presentation))
        axios.post('core/product/presentation', new_product_presentation).then((result) => {
                console.log("api############# ADD product_presentation")
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editProductPresentation(modified_product_presentation, cb) {
        var id = modified_product_presentation._id
        axios.post('core/product/presentation/' + id, modified_product_presentation).then((result) => {
                console.log("api############# Edit product_presentation" + JSON.stringify(modified_product_presentation))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }
}