import ProductSpecificationsType from '../../api/apiProductSpecificationsManager';

const state = {

    product_specifications: []

}

const mutations = {
    //SET product_specifications
    SET_PRODUCT_SPECIFICATIONS(state, data) {
        state.product_specifications = data
        console.log("###product_specifications:SET###" + JSON.stringify(data))
    },
}

var actions = {

    // GET product_specifications
    GET_PRODUCT_SPECIFICATIONS(context) {
        return new Promise((resolve, reject) => {
            new ProductSpecificationsType(context.rootState.user_session.token).getProductSpecifications((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_PRODUCT_SPECIFICATIONS', data)
                    resolve(data)
                }
            })
        })
    },
    ADD_PRODUCT_SPECIFICATIONS(context, new_product_specifications) {
        return new Promise((resolve, reject) => {
            new ProductSpecificationsType(context.rootState.user_session.token).addProductSpecifications(new_product_specifications, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    },
    EDIT_PRODUCT_SPECIFICATIONS(context, modified_product_specifications) {
        return new Promise((resolve, reject) => {
            new ProductSpecificationsType(context.rootState.user_session.token).editProductSpecifications(modified_product_specifications, (err, data) => {
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