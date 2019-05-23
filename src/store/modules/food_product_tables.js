

import FoodProductType from '../../api/apiFoodProductManager';

const state = {

    food_product: [],
    food_category: []

}

const mutations = {
    //SET FOOD Product
    SET_FOOD_PRODUCT(state, data) {
        state.regions = data
        console.log("###FOOD_PRODUCT:SET###" + JSON.stringify(data))
    },
    //SET FOOD category
    SET_FOOD_CATEGORY(state, data) {
        state.provinces = data
        console.log("###FOOD_CATEGORY:SET###" + JSON.stringify(data))
    }
}

var actions = {

    // Food Product
    GET_FOOD_PRODUCT(context) {
        return new Promise((resolve, reject) => {
            new FoodProductType(context.rootState.user_session.token).getFoodProduct((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_FOOD_PRODUCT', data)
                    resolve(data)
                }
            })
        })
    },
    ADD_FOOD_PRODUCT(context, new_region) {
        return new Promise((resolve, reject) => {
            new FoodProductType(context.rootState.user_session.token).addFoodProduct(new_region, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })

    },
    EDIT_FOOD_PRODUCT(context, modified_food_product) {
        return new Promise((resolve, reject) => {
            new FoodProductType(context.rootState.user_session.token).editFoodProduct(modified_food_product, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })

    },

    //Food Category

    GET_FOOD_CATEGORY(context) {
        return new Promise((resolve, reject) => {
            new FoodProductType(context.rootState.user_session.token).getFoodCategory((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_FOOD_CATEGORY', data)
                    resolve(data)
                }
            })
        })
    },
    ADD_FOOD_CATEGORY(context, new_food_category) {
        return new Promise((resolve, reject) => {
            console.log('new_food_category: ' + JSON.stringify(new_food_category));

            new FoodProductType(context.rootState.user_session.token).addFoodCategory(new_food_category, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })

    },
    EDIT_FOOD_CATEGORY(context, modified_food_category) {
        return new Promise((resolve, reject) => {
            new FoodProductType(context.rootState.user_session.token).editFoodCategory(modified_food_category, (err, data) => {
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