import CountryOfOriginType from '../../api/apiCountryOfOrigin';

const state = {

    country_of_origin: []

}

const mutations = {
    //SET COUNTRY_OF_ORIGIN
    SET_COUNTRY_OF_ORIGIN(state, data) {
        state.type_of_country = data
        console.log("###COUNTRY_OF_ORIGIN:SET###" + JSON.stringify(data))
    },
}

var actions = {

    // GET COUNTRY_OF_ORIGIN
    GET_COUNTRY_OF_ORIGIN(context) {
        return new Promise((resolve, reject) => {
            new CountryOfOriginType(context.rootState.user_session.token).getCountryOfOrigin((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_COUNTRY_OF_ORIGIN', data)
                    resolve(data)
                }
            })
        })
    },
    ADD_COUNTRY_OF_ORIGIN(context, new_type_of_country) {
        return new Promise((resolve, reject) => {
            new CountryOfOriginType(context.rootState.user_session.token).addCountryOfOrigin(new_country_of_origin, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    },
    EDIT_COUNTRY_OF_ORIGIN(context, modified_country_of_origin) {
        return new Promise((resolve, reject) => {
            new countryOfOriginType(context.rootState.user_session.token).editCountryOfOrigin(modified_country_of_origin, (err, data) => {
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