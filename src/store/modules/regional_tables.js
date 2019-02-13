import RegionType from '../../api/apiRegional';

const state = {

    regions: {},
    provinces: {},
    cities: {}

}

const mutations = {
    //SET REGION
    SET_REGION(state, data) {
        state.regions = data
        console.log("###PREGION:SET###" + JSON.stringify(data))
    },
    //SET PROVINCE
    SET_PROVINCE(state, data) {
        state.provinces = data
        console.log("###PROVINCE:SET###" + JSON.stringify(data))
    },
    //SET CITY
    SET_CITY(state, data) {
        state.cities = data
        console.log("###CITY:SET###" + JSON.stringify(data))
    },


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
    EDIT_REGION(context, modified_region) {
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

    GET_PROVINCE(context) {
        return new Promise((resolve, reject) => {
            new RegionType(context.rootState.user_session.token).getProvince((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_PROVINCE', data)
                    resolve(data)
                }
            })
        })
    },
    ADD_PROVINCE(context, new_province) {
        return new Promise((resolve, reject) => {
            new RegionType(context.rootState.user_session.token).addProvince(new_province, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })

    },
    EDIT_PROVINCE(context, modified_province) {
        return new Promise((resolve, reject) => {
            new RegionType(context.rootState.user_session.token).editProvince(modified_province, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })

    },

    //CITY

    GET_CITY(context) {
        return new Promise((resolve, reject) => {
            new RegionType(context.rootState.user_session.token).getCity((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_CITY', data)
                    resolve(data)
                }
            })
        })
    },
    ADD_CITY(context, new_city) {
        return new Promise((resolve, reject) => {
            new RegionType(context.rootState.user_session.token).addCity(new_city, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })

    },
    EDIT_PROVINCE(context, modified_city) {
        return new Promise((resolve, reject) => {
            new RegionType(context.rootState.user_session.token).editCity(modified_city, (err, data) => {
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