function initialState() {
    return {
        navigation: []
    }
}

const state = initialState()

const mutations = {
    DROP_BREADCRUMBS: function (state, payload) {
        console.log("drop breadcrumbs payload: " + JSON.stringify(payload))
        console.log("drop breadcrumbs state: " + JSON.stringify(state))
        var index = state.navigation.map(e => e.name).indexOf(payload.name);
        if (index > -1) {
            state.navigation.splice(index + 1, state.navigation.length)
        } else {
            state.navigation.push(payload)
        }
    },
    
    PICKUP_BREADCRUMBS: function (state, payload) {
        //remove all
        state.navigation = []
    },


    RESET(state) {
        const s = initialState()
        Object.keys(s).forEach(key => {
            state[key] = s[key]
        })
    }
}


export default {
    state,
    mutations
};

// const state = {
//     navigation: []
// };

// const mutations = {
//     DROP_BREADCRUMBS: function (state, payload) {
//         var index = state.navigation.map(e => e.name).indexOf(payload.name);
//         if (index > -1) {
//             state.navigation.splice(index + 1, state.navigation.length)
//         } else {
//             state.navigation.push(payload)
//         }
//     },

//     PICKUP_BREADCRUMBS: function (state, payload) {
//         //remove all
//         state.navigation = []
//     }
// }


// export default {
//     state,
//     mutations
// };