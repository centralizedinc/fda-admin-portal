import ProductType from '../../api/apiProductManager';



const state = {
    productType: [],
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
    SET_PRODUCT(state, data) {
        state.productType = data
    },
    SET_PRIMARY(state, data) {
        state.primary = data
    },
    SET_SECONDARY(state, data) {
        state.secondary = data
    },
    SET_ADDITIONAL(state, data) {
        state.additional = data
    },
    SET_DECLARED_CAPITAL(state, data) {
        state.declaredCapital = data
    },
    SET_REGION(state, data) {
        state.region = data
    },
    SET_PROVINCE(state, data) {
        state.region = data
    },
    SET_CITY(state, data) {
        state.city = data
    },

}

var actions = {
    GET_PRODUCT(context) {
        new ProductType(context.rootState.user_session.token).getProduct((data, err) => {

            context.commit('SET_PRODUCT', data)
        })
    },
    GET_PRIMARY(context) {
        new ProductType(context.rootState.user_session.token).getPrimary((data, err) => {

            context.commit('SET_PRIMARY', data)
        })
    },
    GET_SECONDARY(context) {
        new ProductType(context.rootState.user_session.token).getSecondary((data, err) => {

            context.commit('SET_SECONDARY', data)
        })
    },
    GET_ADDITIONAL(context) {
        new ProductType(context.rootState.user_session.token).getAdditional((data, err) => {

            context.commit('SET_ADDITIONAL', data)
        })
    },
    GET_DECLARED_CAPITAL(context) {
        new ProductType(context.rootState.user_session.token).getDeclaredCapital((data, err) => {

            context.commit('SET_DECLARED_CAPITAL', data)
        })
    },
    GET_REGION(context) {
        new ProductType(context.rootState.user_session.token).getRegion((data, err) => {

            context.commit('SET_REGION', data)
        })
    },
    GET_PROVINCE(context) {
        new ProductType(context.rootState.user_session.token).getProvince((data, err) => {

            context.commit('SET_PROVINCE', data)
        })
    },
    GET_CITY(context) {
        new ProductType(context.rootState.user_session.token).getCity((data, err) => {

            context.commit('SET_CITY', data)
        })
    },
    GET_ZIP_CODE(context) {
        new ProductType(context.rootState.user_session.token).getZipCode((data, err) => {

            context.commit('SET_ZIP_CODE', data)
        })
    },
}



export default {

    state,
    mutations,
    actions
}