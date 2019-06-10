import NutritionInformationType from '../../api/apiNutritionInformationManager';

const state = {

    nutrition_information: []

}

const mutations = {
    //SET nutrition_information
    SET_NUTRITION_INFORMATION(state, data) {
        state.nutrition_information = data
        console.log("###nutrition_information:SET###" + JSON.stringify(data))
    },
}

var actions = {

    // GET nutrition_information
    GET_NUTRITION_INFORMATION(context) {
        return new Promise((resolve, reject) => {
            new NutritionInformationType(context.rootState.user_session.token).getNutritionInformation((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_NUTRITION_INFORMATION', data)
                    resolve(data)
                }
            })
        })
    },
    ADD_NUTRITION_INFORMATION(context, new_nutrition_information) {
        return new Promise((resolve, reject) => {
            new NutritionInformationType(context.rootState.user_session.token).addNutritionInformation(new_nutrition_information, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    },
    EDIT_NUTRITION_INFORMATION(context, modified_nutrition_information) {
        return new Promise((resolve, reject) => {
            new NutritionInformationType(context.rootState.user_session.token).editNutritionInformation(modified_nutrition_information, (err, data) => {
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