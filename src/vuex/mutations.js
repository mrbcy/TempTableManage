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
    }
}
