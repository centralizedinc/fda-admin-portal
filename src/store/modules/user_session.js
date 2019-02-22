import LoginType from '../../api/apiLoginManager';
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
    LOGOUT(state) {
        state.token = '';
        state.user = {};
        state.isAuthenticated = false;
    }
}


var actions = {
    //   checkAdmin: (state, data) => {
    //     console.log('############ calling token: ' + JSON.stringify(state.state.user._id))
    //     var instance = setAuthToken(state.state.token)
    //     return instance.get('/api/users/isAdmin/' + state.state.user._id)
    //   }
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

    }
}
export default {
    state,
    mutations,
    actions
}