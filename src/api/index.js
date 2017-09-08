/**
 * Created by Yang on 2017/9/6.
 */
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);
let baseURL = "http://localhost:3000/";
const TableResource = Vue.resource(baseURL + 'tableList{/_id}');
const UserResource = Vue.resource(baseURL + 'userList{/_id}');

export default {
    fetchTables:() => {
        return TableResource.get()
    },
    addNewTable:(data) => {
        return TableResource.save(data)
    },
    updateTable:(data) => {
        return TableResource.update({_id: data._id}, data)
    },
    deleteTable:(_id) => {
        return TableResource.remove({_id:_id})
    },
    fetchUsers:() => {
        return UserResource.get()
    },
    addNewUser:(data) => {
        return UserResource.save(data)
    },
    updateUser:(data) => {
        return UserResource.update({_id: data._id}, data)
    },
    deleteUser:(_id) => {
        return UserResource.remove({_id:_id})
    }
}
