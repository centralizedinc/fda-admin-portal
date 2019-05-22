import ChecklistType from '../../api/apiChecklistCert';

const state = {
    checklist: []

}

const mutations = {

    SET_CHECKLIST_CERT(state, data) {
        state.checklist = data
        console.log("###CHECKLIST:SET###" + JSON.stringify(data))
    }

}

var actions = {

    GET_CHECKLIST_CERT(context) {
        return new Promise((resolve, reject) => {
            new ChecklistType(context.rootState.user_session.token).getChecklistCert((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_CHECKLIST_CERT', data)
                    resolve(data)
                }
            })
        })
    },
    
    ADD_CHECKLIST_CERT(context, new_checklist) {
        return new Promise((resolve, reject) => {
            new ChecklistType(context.rootState.user_session.token).addChecklistCert(new_checklist, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    },

    EDIT_CHECKLIST_CERT(context, modified_checklist) {
        return new Promise((resolve, reject) => {
            new ChecklistType(context.rootState.user_session.token).editChecklistCert(modified_checklist, (err, data) => {
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