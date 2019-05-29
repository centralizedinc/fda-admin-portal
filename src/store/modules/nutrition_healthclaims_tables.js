import NutritionHealthClaimsType from '../../api/apiNutritionHealthClaimsManager';

const state = {

    nutrition_healthclaims: []

}

const mutations = {
    //SET nutrition_healthclaims
    SET_NUTRITION_HEALTHCLAIMS(state, data) {
        state.nutrition_healthclaims = data
        console.log("###nutrition_healthclaims:SET###" + JSON.stringify(data))
    },
}

var actions = {

    // GET nutrition_healthclaims
    GET_NUTRITION_HEALTHCLAIMS(context) {
        return new Promise((resolve, reject) => {
            new NutritionHealthClaimsType(context.rootState.user_session.token).getNutritionHealthClaims((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_NUTRITION_HEALTHCLAIMS', data)
                    resolve(data)
                }
            })
        })
    },
    ADD_NUTRITION_HEALTHCLAIMS(context, new_nutrition_healthclaims) {
        return new Promise((resolve, reject) => {
            new NutritionHealthClaimsType(context.rootState.user_session.token).addNutritionHealthClaims(new_nutrition_healthclaims, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    },
    EDIT_NUTRITION_HEALTHCLAIMS(context, modified_nutrition_healthclaims) {
        return new Promise((resolve, reject) => {
            new NutritionHealthClaimsType(context.rootState.user_session.token).editNutritionHealthClaims(modified_nutrition_healthclaims, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })

    }
}

export default {
    state,
    mutations,
    actions
}

