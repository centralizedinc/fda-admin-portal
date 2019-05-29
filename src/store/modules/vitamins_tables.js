import VitaminsType from '../../api/apiVitaminsManager';

const state = {

    vitamins: []

}

const mutations = {
    //SET vitamins
    SET_VITAMINS(state, data) {
        state.vitamins = data
        console.log("###vitamins:SET###" + JSON.stringify(data))
    },
}

var actions = {

    // GET vitamins
    GET_VITAMINS(context) {
        return new Promise((resolve, reject) => {
            new VitaminsType(context.rootState.user_session.token).getVitamins((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_vitamins', data)
                    resolve(data)
                }
            })
        })
    },
    ADD_VITAMINS(context, new_vitamins) {
        return new Promise((resolve, reject) => {
            new VitaminsType(context.rootState.user_session.token).addVitamins(new_vitamins, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    },
    EDIT_VITAMINS(context, modified_vitamins) {
        return new Promise((resolve, reject) => {
            new VitaminsType(context.rootState.user_session.token).editVitamins(modified_vitamins, (err, data) => {
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