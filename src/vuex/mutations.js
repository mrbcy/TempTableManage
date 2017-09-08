/**
 * Created by Yang on 2017/9/5.
 */

import * as types from './mutation_types'

export default {
    [types.USER_LOGIN](state, user){
        state.currentUser = user;
    },
    [types.USER_LOGOUT](state){
        state.currentUser = {};
    },
    [types.POPULATE_TABLE_LISTS](state,lists){
        state.tableList = lists;
    },
    [types.POPULATE_USER_LISTS](state,lists){
        state.userList = lists;
    }
}
