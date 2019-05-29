import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI

export default class NutritionHealthClaimsType {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getNutritionHealthClaims(cb) {

        axios.get('core/health').then((result) => {
                console.log("###API### GET NutritionHealthClaims")
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

    addNutritionHealthClaims(new_nutrition_healthclaims, cb) {
        console.log("api############# add nutritionhealthclaims" + JSON.stringify(new_nutrition_healthclaims))
        axios.post('core/health', new_nutrition_healthclaims).then((result) => {
                console.log("api############# ADD NutritionHealthClaims")
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editNutritionHealthClaims(modified_nutrition_healthclaims, cb) {
        var id = modified_nutrition_healthclaims._id
        axios.post('core/health/' + id, modified_nutrition_healthclaims).then((result) => {
                console.log("api############# Edit NutritionHealthClaims" + JSON.stringify(modified_nutrition_healthclaims))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }
}
