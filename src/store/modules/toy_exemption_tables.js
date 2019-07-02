import ToyExemptionType from '../../api/apiToyExemptionManager';

const state = {

    toy_exemption: []

}

const mutations = {
    //SET toy_exemption
    SET_TOY_EXEMPTION(state, data) {
        state.toy_exemption = data
        console.log("###toy_exemption:SET###" + JSON.stringify(data))
    },
}

var actions = {

    // GET toy_exemption
    GET_TOY_EXEMPTION(context) {
        return new Promise((resolve, reject) => {
            new ToyExemptionType(context.rootState.user_session.token).getToyExemption((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_TOY_EXEMPTION', data)
                    resolve(data)
                }
            })
        })
    },
    ADD_TOY_EXEMPTION(context, new_toy_exemption) {
        return new Promise((resolve, reject) => {
            new ToyExemptionType(context.rootState.user_session.token).addToyExemption(new_toy_exemption, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    },
    EDIT_TOY_EXEMPTION(context, modified_toy_exemption) {
        return new Promise((resolve, reject) => {
            new ToyExemptionType(context.rootState.user_session.token).editToyExemption(modified_toy_exemption, (err, data) => {
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