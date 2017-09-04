/**
 * Created by Yang on 2017/9/5.
 */

import _ from 'underscore'

export default {
    getUserList:state => state.userlist,
    getUserById: (state, getters) =>(_id) => {
        return _.findWhere(state.userlist, {_id: _id})
    }
}
