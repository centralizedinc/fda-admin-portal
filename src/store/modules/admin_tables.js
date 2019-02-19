import AdminType from '../../api/apiAdminManager';

const state = {
    admins: [],
    roles: []

}

const mutations = {

    SET_ADMIN(state, data) {
        state.admins = data
        console.log("###ADMIN:SET###" + JSON.stringify(data))
    }
}

var actions = {
//admin / approver
    GET_ADMIN(context) {
        return new Promise((resolve, reject) => {
            new AdminType(context.rootState.user_session.token).getAdmin((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_ADMIN', data)
                    resolve(data)
                }
            })
        })
    },
    ADD_ADMIN(context, new_admin) {
        return new Promise((resolve, reject) => {
            new AdminType(context.rootState.user_session.token).addAdmin(new_admin, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })

    },
    EDIT_ADMIN(context, modified_admin) {
        return new Promise((resolve, reject) => {
            console.log("#####################"+ JSON.stringify(modified_admin))
            new AdminType(context.rootState.user_session.token).editAdmin(modified_admin, (err, data) => {
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