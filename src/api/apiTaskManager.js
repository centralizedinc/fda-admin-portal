import axios from 'axios'

axios.defaults.baseURL = 'https://fda-services.herokuapp.com/v1.0'

export default class TaskType {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
    }

    getTask(cb) {

        axios.get('lto-api/task').then((result) => {
                console.log("###API### GET TASK")
                if (result.data.success) {
                    cb(result.data.errors, result.data.model)
                } else {
                    cb(result.data.errors)
                }
            })
            .catch(err => {
                cb(err)
            })
    }

    addTask(new_task, cb) {
        console.log("api############# add Task" + JSON.stringify(new_task))
        axios.post('lto-api/task', new_task).then((result) => {
                console.log("api############# ADD TASK")
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editTask(modified_task, cb) {
        var id = modified_task._id
        axios.post('lto-api/task/' + id, modified_task).then((result) => {
                console.log("api############# EditTask" + JSON.stringify(modified_task))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }
}

    // getTask
    // getDefaultTask
    // getTaskByConditions
    // getOneTaskByConditions
    // getTaskById
    // addTask
    // modifyTask
    // modifyTaskById

