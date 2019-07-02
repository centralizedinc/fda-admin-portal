import ProductPresentationType from '../../api/apiProductPresentationManager';

const state = {

    product_presentation: []

}

const mutations = {
    //SET product_presentation
    SET_PRODUCT_PRESENTATION(state, data) {
        state.product_presentation = data
        console.log("###product_presentation:SET###" + JSON.stringify(data))
    },
}

var actions = {

    // GET product_presentation
    GET_PRODUCT_PRESENTATION(context) {
        return new Promise((resolve, reject) => {
            new ProductPresentationType(context.rootState.user_session.token).getProductPresentation((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_PRODUCT_PRESENTATION', data)
                    resolve(data)
                }
            })
        })
    },
    ADD_PRODUCT_PRESENTATION(context, new_product_presentation) {
        return new Promise((resolve, reject) => {
            new ProductPresentationType(context.rootState.user_session.token).addProductPresentation(new_product_presentation, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    },
    EDIT_PRODUCT_PRESENTATION(context, modified_product_presentation) {
        return new Promise((resolve, reject) => {
            new ProductPresentationType(context.rootState.user_session.token).editProductPresentation(modified_product_presentation, (err, data) => {
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