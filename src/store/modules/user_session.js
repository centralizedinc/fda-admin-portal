import LoginType from '../../api/apiLoginManager';
import UserPassword from '../../api/apiUserManager'
// var jwt = require('jsonwebtoken')

const state = {
    isAuthenticated: false,
    token: '',
    user: {}
}

const mutations = {

    SET_LOGIN(state, data) {
        state.token = data.token
        state.user = data.user
        state.isAuthenticated = data.isMatch
        console.log("###login:SET###" + JSON.stringify(data))
    },
    SET_USER(state, user) {
        state.user = user
        console.log("###user:SET###" + JSON.stringify(user))
    },
    LOGOUT: function (state) {
        state.user = {};
        state.token = false;
        state.isAuthenticated = false;
    }
}


var actions = {

    LOGIN(context, credentials) {
        return new Promise((resolve, reject) => {
            new LoginType(context.rootState.user_session.token).login(credentials, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_LOGIN', data)
                    resolve(data)
                }
            })
        })

    },

    LOGOUT: (context) => {
        context.commit('LOGOUT')
        context.commit('PICKUP_BREADCRUMBS')
    },

    CHANGE_PASSWORD(context, modified_credentials) {
        return new Promise((resolve, reject) => {
            new UserPassword(context.rootState.user_session.token).changePassword(modified_credentials, (err, data) => {
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