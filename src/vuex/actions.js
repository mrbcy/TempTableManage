/**
 * Created by Yang on 2017/9/5.
 */
import {USER_LOGIN, USER_LOGOUT, POPULATE_TABLE_LISTS} from './mutation_types'
import api from '../api'

export default {
    userLogin:(store, user) => {
        store.commit(USER_LOGIN, user);
    },
    userLogout:(store) => {
        store.commit(USER_LOGOUT);
    },
    populateTableLists:({commit}) =>{
        return new Promise((resolve, reject) => {
            api.fetchTables().then(response =>{
                commit(POPULATE_TABLE_LISTS, response.data);
                resolve(response.data)
            },error=>{
                commit(POPULATE_TABLE_LISTS, []);
                reject(error)
            })
        });
    },
    addNewTable:(store, table) => {
        return new Promise((resolve, reject) => {
            api.addNewTable(table).then(response =>{
                // store.dispatch(POPULATE_POINT_LISTS);
                // 稍后会返回到列表页，自己加载列表数据
                resolve(response.data)
            },error=>{
                reject(error)
            })
        });
    },
    updateTable:(store, table) => {
        return new Promise((resolve, reject) => {
            api.updateTable(table).then(response =>{
                resolve(response.data)
            },error=>{
                reject(error)
            })
        });
    },
    deleteTable:(store, table) => {
        return new Promise((resolve, reject) => {
            api.deleteTable(table._id).then(response =>{
                store.dispatch('populateTableLists');
                resolve(response.data)
            },error=>{
                reject(error)
            })
        });
    }
}
