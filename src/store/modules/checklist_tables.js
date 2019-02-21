import ChecklistType from '../../api/apiChecklist';

const state = {
    checklist: []

}

const mutations = {

    SET_CHECKLIST(state, data) {
        state.checklist = data
        console.log("###CHECKLIST:SET###" + JSON.stringify(data))
    }

}

var actions = {

    GET_CHECKLIST(context) {
        return new Promise((resolve, reject) => {
            new ChecklistType(context.rootState.user_session.token).getChecklist((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_CHECKLIST', data)
                    resolve(data)
                }
            })
        })
    },
    
    ADD_CHECKLIST(context, new_checklist) {
        return new Promise((resolve, reject) => {
            new ChecklistType(context.rootState.user_session.token).addChecklist(new_checklist, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    },

    EDIT_CHECKLIST(context, modified_checklist) {
        return new Promise((resolve, reject) => {
            new ChecklistType(context.rootState.user_session.token).editChecklist(modified_checklist, (err, data) => {
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