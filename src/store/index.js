import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import * as Cookies from 'js-cookie';

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
    modules,
    strict: process.env.NODE_ENV !== 'production',
    plugin: [createPersistedState()]
})