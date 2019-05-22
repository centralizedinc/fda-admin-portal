import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI

export default class TaskType {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getTaskCert(cb) {

        axios.get('certificates/task').then((result) => {
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

    addTaskCert(new_task, cb) {
        console.log("api############# add Task Cert" + JSON.stringify(new_task))
        axios.post('certificates/task', new_task).then((result) => {
                console.log("api############# ADD TASK Cert")
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editTaskCert(modified_task, cb) {
        var id = modified_task._id
        axios.post('certificates/task/' + id, modified_task).then((result) => {
                console.log("api############# EditTaskCert" + JSON.stringify(modified_task))
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

