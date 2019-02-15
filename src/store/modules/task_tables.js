import TaskType from '../../api/apiTaskManager';

const state = {
    tasks: []

}

const mutations = {

    SET_TASK(state, data) {
        state.tasks = data
        console.log("###TASK:SET###" + JSON.stringify(data))
    }

}

var actions = {

    GET_TASK(context) {
        return new Promise((resolve, reject) => {
            new TaskType(context.rootState.user_session.token).getTask((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_TASK', data)
                    resolve(data)
                }
            })
        })
    },
    
    ADD_TASK(context, new_task) {
        return new Promise((resolve, reject) => {
            new TaskType(context.rootState.user_session.token).addTask(new_task, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    },

    EDIT_TASK(context, modified_task) {
        return new Promise((resolve, reject) => {
            new TaskType(context.rootState.user_session.token).editTask(modified_task, (err, data) => {
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