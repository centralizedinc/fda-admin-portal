import TaskType from '../../api/apiApproverAccounts';

const state = {
    tasks: []

}

const mutations = {

    SET_APPROVER(state, data) {
        state.approver = data
        console.log("###APPROVER:SET###" + JSON.stringify(data))
    }

}

var actions = {

    GET_APPROVER(context) {
        return new Promise((resolve, reject) => {
            new ApproverType(context.rootState.user_session.token).getApprover((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_APPROVER', data)
                    resolve(data)
                }
            })
        })
    },
    
    ADD_APPROVER(context, new_approver) {
        return new Promise((resolve, reject) => {
            new TaskType(context.rootState.user_session.token).addApprover(new_approver, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    },

    EDIT_APPROVER(context, modified_approver) {
        return new Promise((resolve, reject) => {
            new TaskType(context.rootState.user_session.token).editApprover(modified_approver, (err, data) => {
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