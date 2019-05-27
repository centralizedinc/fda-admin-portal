import TypeOfSourceType from '../../api/apiTypeOfSource';

const state = {

    typeofsource: []

}

const mutations = {
    //SET TYPEOFSOURCE
    SET_TYPEOFSOURCE(state, data) {
        state.typeofsource = data
        console.log("###typeofsource:SET###" + JSON.stringify(data))
    },
}

var actions = {

    // GET TYPEOFSOURCE
    GET_TYPEOFSOURCE(context) {
        return new Promise((resolve, reject) => {
            new TypeOfSourceType(context.rootState.user_session.token).getTypeOfSource((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_TYPEOFSOURCE', data)
                    resolve(data)
                }
            })
        })
    },
    ADD_TYPEOFSOURCE(context, new_typeofsource) {
        return new Promise((resolve, reject) => {
            new TypeOfSourceType(context.rootState.user_session.token).addTypeOfSource(new_typeofsource, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    },
    EDIT_TYPEOFSOURCE(context, modified_typeofsource) {
        return new Promise((resolve, reject) => {
            new typeOfsourceType(context.rootState.user_session.token).editTypeOfSource(modified_typeofsource, (err, data) => {
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