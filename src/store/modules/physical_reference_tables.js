

import PhysicalReferenceType from '../../api/apiPhysicalReferenceManager';

const state = {

    physical_reference: []

}

const mutations = {
    //SET PHYSICAL REFERENCE
    SET_PHYSICAL_REFERENCE(state, data) {
        state.physical_reference = data
        console.log("###physical_reference:SET###" + JSON.stringify(data))
    },
}

var actions = {

    // Food Product
    GET_PHYSICAL_REFERENCE(context) {
        return new Promise((resolve, reject) => {
            new PhysicalReferenceType(context.rootState.user_session.token).getPhysicalReference((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_PHYSICAL_REFERENCE', data)
                    resolve(data)
                }
            })
        })
    },
    ADD_PHYSICAL_REFERENCE(context, physical_reference) {
        return new Promise((resolve, reject) => {
            new PhysicalReferenceType(context.rootState.user_session.token).addPhysicalReference(physical_reference, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })

    },
    EDIT_PHYSICAL_REFERENCE(context, modified_physical_reference) {
        return new Promise((resolve, reject) => {
            new PhysicalReferenceType(context.rootState.user_session.token).editPhysicalReference(modified_physical_reference, (err, data) => {
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