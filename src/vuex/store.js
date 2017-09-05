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
    tableList : [
        {
            _id : "0001",
            tableExp : "^tmp.user_tmp_(.*)$",
            userId : "admin",
            expiredDate : "2019-08-10T16:00:00.000Z"
        },
        {
            _id : "0002",
            tableExp : "^tmp.cy_for_save",
            userId : "chenyang",
            expiredDate : "2017-09-10T16:00:00.000Z"
        },
        {
            _id : "0003",
            tableExp : "^tmp.xx_for_save_02",
            userId : "xuexin",
            expiredDate : "2017-09-10T16:00:00.000Z"
        }
    ],
    currentUser:{}
};

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})
