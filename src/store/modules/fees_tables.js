import Fees from '../../api/apiFee';

const state = {
    declaredCapital: [],
    primary: [],
    fees: [],
    products: []


}

const mutations = {
    SET_FEES(state, data) {
        state.fees = data
        console.log("###FEE:SET###" + JSON.stringify(data))
    }
}

var actions = {

    // GET_FEE
    GET_FEES(context) {
        return new Promise((resolve, reject) => {
            new Fees(context.rootState.user_session.token).getFees((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_FEES', data)
                    resolve(data)
                }
            })
        })
    },
    ADD_FEES(context, new_fees) {
        return new Promise((resolve, reject) => {
            new Fees(context.rootState.user_session.token).addFees(new_fees, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })

    },
    EDIT_FEES(context, modified_fees) {
        return new Promise((resolve, reject) => {
            new Fees(context.rootState.user_session.token).editFees(modified_fees, (err, data) => {
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