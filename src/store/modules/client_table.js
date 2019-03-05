import ClientType from '../../api/apiClientManager';

const state = {
    clients: []

}

const mutations = {

    SET_CLIENT(state, data) {
        state.clients = data
        console.log("###CLIENT:SET###" + JSON.stringify(data))
    }

}

var actions = {

    GET_CLIENT(context) {
        return new Promise((resolve, reject) => {
            
            new ClientType(context.rootState.user_session.token).getClient((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_CLIENT', data)
                    resolve(data)
                }
            })
        })
    }
    // ADD_CLIENT(context, new_client) {
    //     return new Promise((resolve, reject) => {
    //         new ClientType(context.rootState.user_session.token).addClient(new_client, (err, data) => {
    //             if (err) {
    //                 reject(err)
    //             } else {
    //                 resolve(data)
    //             }
    //         })
    //     })

    // },
    // EDIT_CLIENT(context, modified_client) {
    //     return new Promise((resolve, reject) => {
    //         new ClientType(context.rootState.user_session.token).editClient(modified_client, (err, data) => {
    //             if (err) {
    //                 reject(err)
    //             } else {
    //                 resolve(data)
    //             }
    //         })
    //     })

    // }

}

export default {
    state,
    mutations,
    actions
}