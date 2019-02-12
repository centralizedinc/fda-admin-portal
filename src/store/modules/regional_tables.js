import RegionType from '../../api/apiRegional';

const state = {

    regions: {}

}

const mutations = {
    SET_REGION(state, data) {
        state.regions = data
        console.log("###PREGION:SET###" + JSON.stringify(data))
    }

}

var actions = {

    // REGION
    GET_REGION(context) {
        return new Promise((resolve, reject) => {
            new RegionType(context.rootState.user_session.token).getRegion((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_REGION', data)
                    resolve(data)
                }
            })
        })
    },
    ADD_REGION(context, new_region) {
        return new Promise((resolve, reject) => {
            new RegionType(context.rootState.user_session.token).addRegion(new_region, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })

    },
    EDIT_PRODUCTS(context, modified_region) {
        return new Promise((resolve, reject) => {
            new RegionType(context.rootState.user_session.token).editRegion(modified_region, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })

    },

    //PROVINCE

    //CITY

}

export default {
    state,
    mutations,
    actions
}