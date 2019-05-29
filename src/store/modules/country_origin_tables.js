import CountryOriginType from '../../api/apiCountryOriginManager';

const state = {

    country_origin: []

}

const mutations = {
    //SET country_origin
    SET_COUNTRY_ORIGIN(state, data) {
        state.country_origin = data
        console.log("###country_origin:SET###" + JSON.stringify(data))
    },
}

var actions = {

    // GET country_origin
    GET_COUNTRY_ORIGIN(context) {
        return new Promise((resolve, reject) => {
            new CountryOriginType(context.rootState.user_session.token).getCountryOrigin((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_COUNTRY_ORIGIN', data)
                    resolve(data)
                }
            })
        })
    },
    ADD_COUNTRY_ORIGIN(context, new_country_origin) {
        return new Promise((resolve, reject) => {
            new CountryOriginType(context.rootState.user_session.token).addCountryOrigin(new_country_origin, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    },
    EDIT_COUNTRY_ORIGIN(context, modified_country_origin) {
        return new Promise((resolve, reject) => {
            new CountryOriginType(context.rootState.user_session.token).editCountryOrigin(modified_country_origin, (err, data) => {
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