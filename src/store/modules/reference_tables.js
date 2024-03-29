import ProductType from '../../api/apiProductManager';

const state = {
    products: [],
    primary: [],
    secondary: [],
    additional: [],
    declaredCapital: [],
    region: null,
    province: null,
    city: null,
    zipCode: 0

}

const mutations = {
    SET_PRODUCTS(state, data) {
        state.products = data
        console.log("###PRODUCT:SET###" + JSON.stringify(data))
    },
    SET_PRIMARY(state, data) {
        console.log("###PRIMARY:SET###" + JSON.stringify(data))
        state.primary = data
    },
    SET_SECONDARY(state, data) {
        console.log("###SECONDARY:SET###" + JSON.stringify(data))
        state.secondary = data
    },
    SET_ADDITIONAL(state, data) {
        console.log("###ADDITIONAL:SET###" + JSON.stringify(data))
        state.additional = data
    },
    SET_DECLARED_CAPITAL(state, data) {
        console.log("###DECLARED_CAPITAL:SET###" + JSON.stringify(data))
        state.declaredCapital = data
    },

}

var actions = {

    // PRODUCTS
    GET_PRODUCTS(context) {
        return new Promise((resolve, reject) => {
            new ProductType(context.rootState.user_session.token).getProduct((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_PRODUCTS', data)
                    resolve(data)
                }
            })
        })
    },
    ADD_PRODUCTS(context, new_product) {
        return new Promise((resolve, reject) => {
            new ProductType(context.rootState.user_session.token).addProduct(new_product, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })

    },
    EDIT_PRODUCTS(context, modified_product) {
        return new Promise((resolve, reject) => {
            new ProductType(context.rootState.user_session.token).editProduct(modified_product, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })

    },

    // PRIMARY
    GET_PRIMARY(context) {
        return new Promise((resolve, reject) => {
            new ProductType(context.rootState.user_session.token).getPrimary((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_PRIMARY', data)
                    resolve(data)
                }

            })
        })
    },
    ADD_PRIMARY(context, new_primary) {
        return new Promise((resolve, reject) => {
            new ProductType(context.rootState.user_session.token).addPrimary(new_primary, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })

    },
    EDIT_PRIMARY(context, modified_primary) {
        return new Promise((resolve, reject) => {
            new ProductType(context.rootState.user_session.token).editPrimary(modified_primary, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })

    },

    //SECONDARY
    GET_SECONDARY(context) {
        return new Promise((resolve, reject) => {
            new ProductType(context.rootState.user_session.token).getSecondary((data, err) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_SECONDARY', data)
                    resolve(data)
                }
            })
        })
    },

    //ADDITIONAL
    GET_ADDITIONAL(context) {
        return new Promise((resolve, reject) => {
            new ProductType(context.rootState.user_session.token).getAdditional((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_ADDITIONAL', data)
                    resolve(data)
                }
            })
        })
    },

    ADD_ADDITIONAL(context, new_additional) {
        return new Promise((resolve, reject) => {
            new ProductType(context.rootState.user_session.token).addAdditional(new_additional, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })

    },

    EDIT_ADDITIONAL(context, modified_additional) {
        return new Promise((resolve, reject) => {
            new ProductType(context.rootState.user_session.token).editAdditional(modified_additional, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })

    },

    //DECLARE CAPITAL
    GET_DECLARED_CAPITAL(context) {
        return new Promise((resolve, reject) => {
            new ProductType(context.rootState.user_session.token).getDeclaredCapital((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_DECLARED_CAPITAL', data)
                    resolve(data)
                }
            })
        })
    },

    ADD_DECLARED(context, new_declared) {
        return new Promise((resolve, reject) => {
            new ProductType(context.rootState.user_session.token).addDeclaredCapital(new_declared, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })

    },

    EDIT_DECLARED(context, modified_declared) {
        return new Promise((resolve, reject) => {
            new ProductType(context.rootState.user_session.token).editDeclaredCapital(modified_declared, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })

    },
}



export default {
    state,
    mutations,
    actions
}