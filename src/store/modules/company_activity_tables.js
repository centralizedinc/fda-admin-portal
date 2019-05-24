import CompanyActivityType from '../../api/apiCompanyActivity';

const state = {

    company_activity: []

}

const mutations = {
    //SET COMPANY_ACTIVITY
    SET_COMPANY_ACTIVITY(state, data) {
        state.company_activity = data
        console.log("###COMPANY_ACTIVITY:SET###" + JSON.stringify(data))
    },
}

var actions = {

    // GET COMPANY_ACTIVITY
    GET_COMPANY_ACTIVITY(context) {
        return new Promise((resolve, reject) => {
            new CompanyActivityType(context.rootState.user_session.token).getCompanyActivity((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_COMPANY_ACTIVITY', data)
                    resolve(data)
                }
            })
        })
    },
    ADD_COMPANY_ACTIVITY(context, new_company_activity) {
        return new Promise((resolve, reject) => {
            new CompanyActivityType(context.rootState.user_session.token).addCompanyActivity(new_company_activity, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    },
    EDIT_COMPANY_ACTIVITY(context, modified_company_activity) {
        return new Promise((resolve, reject) => {
            new CompanyActivityType(context.rootState.user_session.token).editCompanyActivity(modified_company_activity, (err, data) => {
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