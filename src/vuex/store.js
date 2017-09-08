/**
 * Created by Yang on 2017/9/5.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)
const state = {
    tableList : [],
    currentUser:{},
    userList : [
        {
            _id: "admin",
            pw: "21232f297a57a5a743894a0e4a801fc3",
            role: [
                "admin",
                "user"
            ]
        },
        {
            _id: "chenyang",
            pw: "e10adc3949ba59abbe56e057f20f883e",
            role: [
                "user"
            ]
        }
    ]
};

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})
