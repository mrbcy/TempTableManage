<template>
    <div class="table">

        <div class="handle-box">
            <el-button type="success" icon="plus" class="handle-del mr10" @click="newTable">新的备案</el-button>
            <el-input v-model="search_kw" placeholder="用户名、表名或备注关键字" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" >搜索</el-button>
        </div>
        <el-table :data="filteredTableList" border style="width: 100%" ref="multipleTable">
            <el-table-column prop="tableExp" label="表名(正则)" width="260">
            </el-table-column>
            <el-table-column prop="userId" label="用户名" width="120">
            </el-table-column>
            <el-table-column prop="expiredDate" label="过期时间" :formatter="dateFormatter" width="120">
            </el-table-column>
            <el-table-column prop="desc" label="备注">
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
        computed: _.extend({},mapGetters({tableList: 'getTableList', currentUser: 'getCurrentUser'}),{
            filteredTableList: function () {
                let list = [];
                for(var i = 0; i < this.tableList.length; i++){
                    if(this.doAuthFilter(this.tableList[i]) && this.doSearchFilter(this.tableList[i])){
                        list.push(this.tableList[i]);
                    }
                }
                return list;
            }
        }),
        methods: _.extend({}, mapActions(['populateTableLists']) ,{
            newTable(){
                this.$router.push('/newTable');
            },
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
            },
            doSearchFilter(table){
                if(!this.search_kw.trim()){
                    return true;
                }

                if(table.tableExp.indexOf(this.search_kw)>=0
                    || table.userId.indexOf(this.search_kw)>=0
                    || table.desc.indexOf(this.search_kw)>=0){
                    return true;
                }
                return false;
            },
            dateFormatter(row, column){
                var d = new Date(row.expiredDate);
                return formatDate(d, 'yyyy-MM-dd');
            }
        }),
        mounted(){
            this.populateTableLists().then(response => {
    //                this.$message.success('读取埋点列表成功！');
            }, error => {
                this.$message.error('加载埋点列表失败，请检查网络！');
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
