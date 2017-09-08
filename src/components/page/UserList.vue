<template>
    <div class="table">

        <div class="handle-box">
            <el-button type="success" icon="plus" class="handle-del mr10" @click="newTable">添加用户</el-button>
        </div>
        <el-table :data="userList" border style="width: 100%" ref="multipleTable">
            <el-table-column prop="_id" label="用户名" width="200">
            </el-table-column>
            <el-table-column prop="role" label="用户角色" width="200" :formatter="roleFormatter" >
            </el-table-column>
            <el-table-column label="操作" width="150">
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
    import {mapActions} from 'vuex'
    import _ from 'underscore'
    import {formatDate} from '../../plugins/date'

    export default {
        data() {
            return {
                search_kw : ""
            }
        },
        computed: _.extend({},mapGetters({tableList: 'getTableList', currentUser: 'getCurrentUser', userList: 'getUserList'}),{

        }),
        methods: _.extend({}, mapActions(['populateTableLists','deleteTable']) ,{
            newTable(){
//                this.$router.push('/newTable');
            },
            handleEdit(index, row){
//                this.$router.push('/editTable/' + row._id);
            },
            handleDelete(index, row){
//                this.$confirm('此操作将永久删除该备案信息, 是否继续?', '提示', {
//                    confirmButtonText: '确定',
//                    cancelButtonText: '取消',
//                    type: 'warning'
//                }).then(() => {
//                    this.deleteTable(row).then(response => {
//                        this.$message.success('删除备案信息成功！');
//                    }, error => {
//                        this.$message.error('删除备案信息失败，请检查网络！');
//                    })
//                }).catch(() => {
//                });
            },
            roleFormatter(row, column){
                if(row.role.indexOf("admin") >= 0){
                    return "管理员";
                }
                return "用户";
            }
        }),
        mounted(){
            this.populateTableLists().then(response => {
            }, error => {
                this.$message.error('加载用户数据失败，请检查网络！');
            })
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
