import IdentificationType from "../../api/apiIdentification";
const state = {

    identification: []

}

const mutations = {
    //SET Identification
    SET_IDENTIFICATION(state, data) {
        state.identification = data
        console.log("###IDENTIFICATION:SET###" + JSON.stringify(data))
    },
}

var actions = {

    // DESIGNATION
    GET_IDENTIFICATION(context) {
        return new Promise((resolve, reject) => {
            new IdentificationType(context.rootState.user_session.token).getIdentification((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_IDENTIFICATION', data)
                    resolve(data)
                }
            })
        })
    },
    ADD_IDENTIFICATION(context, new_identification) {
        return new Promise((resolve, reject) => {
            new IdentificationType(context.rootState.user_session.token).addIdentification(new_identification, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    },
    EDIT_IDENTIFICATION(context, modified_identification) {
        return new Promise((resolve, reject) => {
            new IdentificationType(context.rootState.user_session.token).editIdentification(modified_identification, (err, data) => {
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