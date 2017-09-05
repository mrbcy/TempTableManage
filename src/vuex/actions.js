/**
 * Created by Yang on 2017/9/5.
 */
import {USER_LOGIN} from './mutation_types'

export default {
    userLogin:(store, user) => {
        store.commit(USER_LOGIN, user);
    }
}
