export default {
    install(Vue, store) {


        Vue.prototype.$notify = (notification) => {
            store.commit('ADD_NOTIFICATION', notification);
        }
    }
}