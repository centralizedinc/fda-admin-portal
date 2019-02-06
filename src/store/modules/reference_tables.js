import ProductType from '../../api/apiProductManager';
import Vue from 'vue'
import Vuex from 'vuex'



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
        console.log("###PRODUCT:SET###" + JSON.stringify(data))
        state.products = data
    },
    SET_PRIMARY(state, data) {
        console.log("###PRIMARY:SET###" + JSON.stringify(data))
        state.primary = data
    },
    SET_SECONDARY(state, data, data_2) {
        console.log("###SECONDARY:SET###" + JSON.stringify(data))
        state.primary = data_2
        state.secondary = data
    },
    SET_ADDITIONAL(state, data, data_2) {
        console.log("###ADDITIONAL:SET###" + JSON.stringify(data))
        state.primary = data_2
        state.additional = data
    },
    SET_DECLARED_CAPITAL(state, data, data_2) {
        console.log("###DECLARED_CAPITAL:SET###" + JSON.stringify(data))
        state.primary = data_2
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
    GET_PRODUCTS(context) {
        new ProductType(context.rootState.user_session.token).getProduct((data, err) => {
            console.log("####product:ACTION####" + JSON.stringify(err))
            context.commit('SET_PRODUCTS', data)
        })
    },
    GET_PRIMARY(context, selectedProduct) {
        new ProductType(context.rootState.user_session.token).getPrimary(selectedProduct, (data, err) => {
            console.log("####primary:ACTION####" + JSON.stringify(err))
            context.commit('SET_PRIMARY', data)
        })
    },
    GET_SECONDARY(context, primary) {
        new ProductType(context.rootState.user_session.token).getSecondary(primary, (data, err) => {
            console.log("####secondary:ACTION####" + JSON.stringify(err))
            context.commit('SET_SECONDARY', data)
        })
    },
    GET_ADDITIONAL(context, secondary) {
        new ProductType(context.rootState.user_session.token).getAdditional(primary, (data, err) => {
            console.log("####additional:ACTION####" + JSON.stringify(err))
            context.commit('SET_ADDITIONAL', data)
        })
    },
    GET_DECLARED_CAPITAL(context) {
        new ProductType(context.rootState.user_session.token).getDeclaredCapital((data, err) => {
            console.log("####declared_capital:ACTION####" + JSON.stringify(err))
            context.commit('SET_DECLARED_CAPITAL', data)
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