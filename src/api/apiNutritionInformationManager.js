import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI

export default class NutritionInformationType {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getNutritionInformation(cb) {

        axios.get('core/nutrition').then((result) => {
                console.log("###API### GET Nutrition Information")
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

    addNutritionInformation(new_nutrition_information, cb) {
        console.log("api############# add Nutrition Information" + JSON.stringify(new_nutrition_information))
        axios.post('core/nutrition', new_nutrition_information).then((result) => {
                console.log("api############# ADD Nutrition Information")
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editNutritionInformation(modified_nutrition_information, cb) {
        var id = modified_nutrition_information._id
        axios.post('core/nutrition/' + id, modified_nutrition_information).then((result) => {
                console.log("api############# Edit Nutrition Information" + JSON.stringify(modified_nutrition_information))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }
}