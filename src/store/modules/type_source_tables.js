import SourceType from '../../api/apiSourceManager';

const state = {

    type_source: []

}

const mutations = {
    //SET type_source
    SET_TYPE_SOURCE(state, data) {
        state.type_source = data
        console.log("###type_source:SET###" + JSON.stringify(data))
    },
}

var actions = {

    // GET type_source
    GET_TYPE_SOURCE(context) {
        return new Promise((resolve, reject) => {
            new SourceType(context.rootState.user_session.token).getSource((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_TYPE_SOURCE', data)
                    resolve(data)
                }
            })
        })
    },
    ADD_TYPE_SOURCE(context, new_type_source) {
        return new Promise((resolve, reject) => {
            new SourceType(context.rootState.user_session.token).addSource(new_type_source, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    },
    EDIT_TYPE_SOURCE(context, modified_type_source) {
        return new Promise((resolve, reject) => {
            new SourceType(context.rootState.user_session.token).editSource(modified_type_source, (err, data) => {
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