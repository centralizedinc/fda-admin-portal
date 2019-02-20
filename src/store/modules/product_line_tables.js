import ProductLine from '../../api/apiProductLineManager';

const state = {
    productLine: [],
    products: []
    

}

const mutations = {
    SET_PRODUCT_LINE(state, data) {
        state.productLine = data
        console.log("###PRODUCT LINE:SET###" + JSON.stringify(data))
    }
}

var actions = {

    // PRODUCT LINE
    GET_PRODUCT_LINE(context) {
        return new Promise((resolve, reject) => {
            new ProductLine(context.rootState.user_session.token).getProductLine((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_PRODUCT_LINE', data)
                    resolve(data)
                }
            })
        })
    },
    ADD_PRODUCT_LINE(context, new_product_line) {
        return new Promise((resolve, reject) => {
            new ProductLine(context.rootState.user_session.token).addProductLine(new_product_line, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })

    },
    EDIT_PRODUCT_LINE(context, modified_product_line) {
        return new Promise((resolve, reject) => {
            new ProductLine(context.rootState.user_session.token).editProductLine(modified_product_line, (err, data) => {
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