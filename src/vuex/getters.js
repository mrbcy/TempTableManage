/**
 * Created by Yang on 2017/9/5.
 */
import _ from 'underscore'

export default {
    getCurrentUser:state => state.currentUser,
    getTableList:state => state.tableList,
    getTableById: (state, getters) =>(_id) => {
        return _.findWhere(state.tableList, {_id: _id})
    },
    getUserList:state => state.userList,
    getUserById: (state, getters) =>(_id) => {
        return _.findWhere(state.userList, {_id: _id})
    },
}
