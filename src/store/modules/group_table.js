import GroupType from '../../api/apiGroupManager';

const state = {
    groups: []

}

const mutations = {

    SET_GROUP(state, data) {
        state.groups = data
        console.log("###PRODUCT:SET###" + JSON.stringify(data))
    }

}

var actions = {

    GET_GROUP(context) {
        return new Promise((resolve, reject) => {
            new GroupType(context.rootState.user_session.token).getGroup((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_GROUP', data)
                    resolve(data)
                }
            })
        })
    },
    ADD_GROUP(context, new_group) {
        return new Promise((resolve, reject) => {
            new GroupType(context.rootState.user_session.token).addGroup(new_group, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })

    },
    EDIT_GROUP(context, modified_group) {
        return new Promise((resolve, reject) => {
            new GroupType(context.rootState.user_session.token).editGroup(modified_group, (err, data) => {
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