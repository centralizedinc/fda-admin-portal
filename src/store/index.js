import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";

import modules from "./modules";

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== "production",
  plugins: [
    createPersistedState({
      key: "fda-admin-reference",
      paths: [
        "admin_tables",
        "breadcrumbs",
        "changePassword_tables",
        "checklist_tables",
        "notification",
        "checklist_tables",
        "client_table",
        "designation_tables",
        "fees_tables",
        "group_table",
        "identification_tables",
        "product_line_tables",
        "profile_tables",
        "reference_tables",
        "regional_tables",
        "task_tables"
      ]
    }),
    //store user session in cookies
    createPersistedState({
      key: "fda-admin-session",
      paths: ["user_session"],
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) =>
          Cookies.set(key, value, { expires: 1, secure: false }),
        removeItem: key => Cookies.remove(key)
      }
    })
  ]
});
