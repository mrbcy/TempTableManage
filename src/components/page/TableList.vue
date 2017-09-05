<template>
    <div class="table">

        <div class="handle-box">
            <el-button type="success" icon="plus" class="handle-del mr10" @click="">新的备案</el-button>
            <el-input v-model="search_kw" placeholder="用户名或表名关键字" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" >搜索</el-button>
        </div>
        <el-table :data="filteredTableList" border style="width: 100%" ref="multipleTable">
            <el-table-column prop="tableExp" label="表名(正则)" width="360">
            </el-table-column>
            <el-table-column prop="userId" label="用户名" width="150">
            </el-table-column>
            <el-table-column prop="expiredDate" label="过期时间">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import _ from 'underscore'

    export default {
        data() {
            return {
                search_kw : ""
            }
        },
        computed: _.extend({},mapGetters({tableList: 'getTableList', currentUser: 'getCurrentUser'}),{
            filteredTableList: function () {
                let list = [];
                for(var i = 0; i < this.tableList.length; i++){
                    if(this.doAuthFilter(this.tableList[i])){
                        list.push(this.tableList[i]);
                    }
                }
                return list;
            }
        }),
        methods: {
            handleEdit(index, row){

            },
            handleDelete(index, row){

            },
            doAuthFilter(table){
                let roles = this.currentUser.role;
                if(roles.includes('admin')){
                    return true;
                }
                if(table.userId === this.currentUser._id){
                    return true;
                }
                return false;
            }
        }
    }
</script>

<style scoped>
.handle-box{
    margin-bottom: 20px;
}
.handle-select{
    width: 120px;
}
.handle-input{
    width: 300px;
    display: inline-block;
}
</style>
