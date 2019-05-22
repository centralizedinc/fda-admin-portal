// import TaskType from '../../api/apiTaskCertManager';

const state = {
    tasks: []

}

const mutations = {

    SET_TASK_CERT(state, data) {
        state.tasks = data
        console.log("###TASK:SET###" + JSON.stringify(data))
    }

}

var actions = {

    GET_TASK_CERT(context) {
        return new Promise((resolve, reject) => {
            new TaskType(context.rootState.user_session.token).getTaskCert((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_TASK_CERT', data)
                    resolve(data)
                }
            })
        })
    },
    
    ADD_TASK_CERT(context, new_task) {
        return new Promise((resolve, reject) => {
            new TaskType(context.rootState.user_session.token).addTaskCert(new_task, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    },

    EDIT_TASK_CERT(context, modified_task) {
        return new Promise((resolve, reject) => {
            new TaskType(context.rootState.user_session.token).editTaskCert(modified_task, (err, data) => {
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