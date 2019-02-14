import axios from 'axios'

axios.defaults.baseURL = 'https://fda-services.herokuapp.com/v1.0'

export default class ClientType {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
    }

    getClient(cb) {

        axios.get('secured/accounts').then((result) => {
                console.log("###API### GET CLIENTS")
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

    // addClient(new_client, cb) {
    //     console.log("api############# add group" + JSON.stringify(new_client))
    //     axios.post('secured/', new_client).then((result) => {
    //             console.log("api############# addgroup")
    //             cb(result.data.errors, result.data.model)
    //         })
    //         .catch(err => {
    //             cb(err)
    //         })
    // }

    // editClient(modified_client, cb) {
    //     var id = modified_client._id
    //     axios.post('secured/' + id, modified_client).then((result) => {
    //             console.log("api############# addgroup" + JSON.stringify(modified_client))
    //             cb(result.data.errors, result.data.model)
    //         })
    //         .catch(err => {
    //             cb(err)
    //         })
    // }
}