import UserPassword from '../../api/apiUserManager';

const state = {
    changePassword: [],
    user: [],
    tasks: [],
    groups: [],
    roles: []

}

const mutations = {

    SET_CHANGE_PASSWORD(state, data) {
        console.log("###PASSWORD:SET###" + JSON.stringify(data))
        state.changePassword = data

    }
}

var actions = {
    //admin / password
    GET_PASSWORD_BY_ID(context, credentials) {
        return new Promise((resolve, reject) => {
            new UserPassword(context.rootState.user_session.token).getPasswordbyId(credentials, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_CHANGE_PASSWORD', data)
                    resolve(data)
                }
            })
        })
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