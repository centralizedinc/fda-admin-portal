import axios from 'axios'

axios.defaults.baseURL = 'https://fda-services.herokuapp.com/v1.0'

export default class ProductLine {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
    }

    getProductLine(cb) {

        axios.get('core/productLine').then((result) => {
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

    addProductLine(new_product_line, cb) {
        console.log("api#############" + JSON.stringify(new_product_line))
        axios.post('core/productLine', new_product_line).then((result) => {
                console.log("api#############:Added:")
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editProductLine(modified_product_line, cb) {
        var id = modified_product_Line._id
        axios.post('core/productLine/' + id, modified_product_line).then((result) => {
                console.log("api#############:Edited" + JSON.stringify(modified_product_line))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }
}