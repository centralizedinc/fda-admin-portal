import LoginType from '../../api/apiLoginManager';
import UserPassword from '../../api/apiUserManager'
import PasswordApi from '../../api/PasswordAPI'
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
    SET_AVATAR(state, avatar) {
        if(!state.user.avatar){
            state.user.avatar = {};
        }
        state.user.avatar.location = avatar;
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

    REQUEST_RESET_PASSWORD(context, old_password) {
        return new PasswordApi(context.rootState.user_session.token)
            .requestResetPassword(old_password)
    },

    CONFIRM_RESET_PASSWORD(context, token) {
        return new PasswordApi(token).confirmResetPassword()
    },

    RESET_PASSWORD(context, account) {
        return new PasswordApi().resetPassword(account)
    }
}
export default {
    state,
    mutations,
    actions
}