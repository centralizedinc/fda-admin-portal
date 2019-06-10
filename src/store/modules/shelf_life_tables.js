import ShelfLifeType from '../../api/apiShelfLifeManager';

const state = {

    shelf_life: []

}

const mutations = {
    //SET shelf_life
    SET_SHELF_LIFE(state, data) {
        state.shelf_life = data
        console.log("###shelf_life:SET###" + JSON.stringify(data))
    },
}

var actions = {

    // GET shelf_life
    GET_SHELF_LIFE(context) {
        return new Promise((resolve, reject) => {
            new ShelfLifeType(context.rootState.user_session.token).getShelfLife((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_SHELF_LIFE', data)
                    resolve(data)
                }
            })
        })
    },
    ADD_SHELF_LIFE(context, new_shelf_life) {
        return new Promise((resolve, reject) => {
            new ShelfLifeType(context.rootState.user_session.token).addShelfLife(new_shelf_life, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    },
    EDIT_SHELF_LIFE(context, modified_shelf_life) {
        return new Promise((resolve, reject) => {
            new ShelfLifeType(context.rootState.user_session.token).editShelfLife(modified_shelf_life, (err, data) => {
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