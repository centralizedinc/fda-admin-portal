import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI

export default class FoodProductType {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['access_token'] = token;
    }

    //Type of Food Product
    getFoodProduct(cb) {
        axios.get('core/food/product').then((result) => {
                console.log("###API:FoodProduct###")
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

    addFoodProduct(new_food_product, cb) {
        console.log("api#############" + JSON.stringify(new_food_product))
        axios.post('core/food/product', new_food_product).then((result) => {
                console.log("api#############")
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editFoodProduct(modified_food_product, cb) {
        var id = modified_food_product._id
        axios.post('core/food/product/' + id, modified_food_product).then((result) => {
                console.log("api#############" + JSON.stringify(modified_food_product))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    //Food Categorization

    getFoodCategory(cb) {
        axios.get('core/food/category').then((result) => {
                console.log("###API:Food Category###")
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

    addFoodCategory(new_food_category, cb) {
        console.log("api#############" + JSON.stringify(new_food_category))
        axios.post('core/food/category', new_food_category).then((result) => {
                console.log("api#############new_province: " + JSON.stringify(result.data))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editFoodCategory(modified_food_category, cb) {
        var id = modified_food_category._id
        axios.post('core/food/category/' + id, modified_food_category).then((result) => {
                console.log("api##### edit food category" + JSON.stringify(result.data))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }
}