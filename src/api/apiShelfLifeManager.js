import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI

export default class ShelfLifeType {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getShelfLife(cb) {

        axios.get('core/shelflife').then((result) => {
                console.log("###API### GET shelf_life")
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

    addShelfLife(new_shelf_life, cb) {
        console.log("api############# add shelf_life" + JSON.stringify(new_shelf_life))
        axios.post('core/shelflife', new_shelf_life).then((result) => {
                console.log("api############# ADD shelf_life")
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editShelfLife(modified_shelf_life, cb) {
        var id = modified_shelf_life._id
        axios.post('core/shelflife/' + id, modified_shelf_life).then((result) => {
                console.log("api############# Edit shelf_life" + JSON.stringify(modified_shelf_life))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }
}