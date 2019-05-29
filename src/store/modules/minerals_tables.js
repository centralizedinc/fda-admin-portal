import MineralsType from '../../api/apiMineralsManager';

const state = {

    minerals: []

}

const mutations = {
    //SET minerals
    SET_minerals(state, data) {
        state.minerals = data
        console.log("###minerals:SET###" + JSON.stringify(data))
    },
}

var actions = {

    // GET minerals
    GET_minerals(context) {
        return new Promise((resolve, reject) => {
            new MineralsType(context.rootState.user_session.token).getMinerals((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_MINERALS', data)
                    resolve(data)
                }
            })
        })
    },
    ADD_minerals(context, new_minerals) {
        return new Promise((resolve, reject) => {
            new MineralsType(context.rootState.user_session.token).addMinerals(new_minerals, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    },
    EDIT_minerals(context, modified_minerals) {
        return new Promise((resolve, reject) => {
            new MineralsType(context.rootState.user_session.token).editMinerals(modified_minerals, (err, data) => {
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