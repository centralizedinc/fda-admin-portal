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
    zipCode: 0,
    new_primary: null

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
    // SET_REGION(state, data) {
    //     state.region = data
    // },
    // SET_PROVINCE(state, data) {
    //     state.region = data
    // },
    // SET_CITY(state, data) {
    //     state.city = data
    // },


}

var actions = {

    // PRODUCTS
    GET_PRODUCTS(context) {
        return new Promise((resolve, reject) => {
            new ProductType(context.rootState.user_session.token).getProduct((data, err) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_PRODUCTS', data)
                    resolve(data)
                }
            })
        })
    },
    ADD_PRODUCTS(context, new_primary) {
        return new Promise((resolve, reject) => {
            new ProductType(context.rootState.user_session.token).addPrimary(new_primary, (data, err) => {
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
            new ProductType(context.rootState.user_session.token).editPrimary(modified_product, (data, err) => {
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
            new ProductType(context.rootState.user_session.token).getPrimary((data, err) => {
                if (!err) {
                    context.commit('SET_PRIMARY', data)
                    resolve()
                } else {
                    reject(err)
                }

            })
        })
    },
    ADD_PRIMARY(context, new_primary) {
        return new Promise((resolve, reject) => {
            new ProductType(context.rootState.user_session.token).addPrimary(new_primary, (data, err) => {
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
            new ProductType(context.rootState.user_session.token).editPrimary(modified_primary, (data, err) => {
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
            new ProductType(context.rootState.user_session.token).getAdditional((data, err) => {
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
            new ProductType(context.rootState.user_session.token).addAdditional(new_additional, (data, err) => {
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
            new ProductType(context.rootState.user_session.token).editAdditional(modified_additional, (data, err) => {
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
            new ProductType(context.rootState.user_session.token).getDeclaredCapital((data, err) => {
                context.commit('SET_DECLARED_CAPITAL', data)
                resolve()
            })
        })
    },

    ADD_DECLARED(context, new_declared) {
        return new Promise((resolve, reject) => {
            new ProductType(context.rootState.user_session.token).addDeclaredCapital(new_declared, (data, err) => {
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
            new ProductType(context.rootState.user_session.token).editDeclaredCapital(modified_declared, (data, err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })

    },
    // GET_REGION(context) {
    //     new ProductType(context.rootState.user_session.token).getRegion((data, err) => {

    //         context.commit('SET_REGION', data)
    //     })
    // },
    // GET_PROVINCE(context) {
    //     new ProductType(context.rootState.user_session.token).getProvince((data, err) => {

    //         context.commit('SET_PROVINCE', data)
    //     })
    // },
    // GET_CITY(context) {
    //     new ProductType(context.rootState.user_session.token).getCity((data, err) => {

    //         context.commit('SET_CITY', data)
    //     })
    // },
    // GET_ZIP_CODE(context) {
    //     new ProductType(context.rootState.user_session.token).getZipCode((data, err) => {

    //         context.commit('SET_ZIP_CODE', data)
    //     })
    // },
}



export default {
    state,
    mutations,
    actions
}