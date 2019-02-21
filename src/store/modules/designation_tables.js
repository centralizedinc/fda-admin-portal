import DesignationType from '../../api/apiDesignation';

const state = {

    designation: []

}

const mutations = {
    //SET Designation
    SET_DESIGNATION(state, data) {
        state.designation = data
        console.log("###DESIGNATION:SET###" + JSON.stringify(data))
    },
}

var actions = {

    // DESIGNATION
    GET_DESIGNATION(context) {
        return new Promise((resolve, reject) => {
            new DesignationType(context.rootState.user_session.token).getDesignation((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_DESIGNATION', data)
                    resolve(data)
                }
            })
        })
    },
    ADD_DESIGNATION(context, new_designation) {
        return new Promise((resolve, reject) => {
            new DesignationType(context.rootState.user_session.token).addDesignation(new_designation, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    },
    EDIT_DESIGNATION(context, modified_designation) {
        return new Promise((resolve, reject) => {
            new DesignationType(context.rootState.user_session.token).editDesignation(modified_designation, (err, data) => {
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