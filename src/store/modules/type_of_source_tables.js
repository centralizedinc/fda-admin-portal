import TypeOfSourceType from '../../api/apiTypeOfSource';

const state = {

    type_of_source: []

}

const mutations = {
    //SET TYPE_OF_SOURCE
    SET_TYPE_OF_SOURCE(state, data) {
        state.type_of_source = data
        console.log("###TYPE_OF_SOURCE:SET###" + JSON.stringify(data))
    },
}

var actions = {

    // GET TYPE_OF_SOURCE
    GET_TYPE_OF_SOURCE(context) {
        return new Promise((resolve, reject) => {
            new TypeOfSourceType(context.rootState.user_session.token).getTypeOfSource((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_TYPE_OF_SOURCE', data)
                    resolve(data)
                }
            })
        })
    },
    ADD_TYPE_OF_SOURCE(context, new_type_of_source) {
        return new Promise((resolve, reject) => {
            new TypeOfSourceType(context.rootState.user_session.token).addTypeOfSource(new_type_of_source, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    },
    EDIT_TYPE_OF_SOURCE(context, modified_type_of_source) {
        return new Promise((resolve, reject) => {
            new typeOfsourceType(context.rootState.user_session.token).editTypeOfSource(modified_type_of_source, (err, data) => {
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