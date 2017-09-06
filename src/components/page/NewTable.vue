<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/tableList'}"><i class="el-icon-date"></i> 临时表备案</el-breadcrumb-item>
                <el-breadcrumb-item>新备案</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="临时表名" prop="tableExp">
                    <el-col :span="19">
                        <el-input v-model="form.tableExp" placeholder="支持Python正则表达式，如：^tmp.user_tmp_(.*)$"></el-input>
                    </el-col>
                    <el-col class="line" :span="1">&nbsp;</el-col>
                    <el-col :span="2">
                        <el-form-item>
                            <el-button type="danger" @click="gotoTest">测试</el-button>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item prop="expiredDate" label="过期时间">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="过期后表会被自动删除" v-model="form.expiredDate" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item prop="desc" label="备注">
                    <el-input type="textarea" :rows="4" v-model="form.desc" placeholder="请输入备注（至少6个字符）"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button @click="onCancel">取消</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import _ from 'underscore'

    export default {
        data: function(){
            return {
                form: {
                    tableExp: '',
                    expiredDate: '',
                    desc: '',
                    userId: this.$store.state.currentUser._id
                },
                rules: {
                    tableExp: [
                        { required: true, message: '请输入表名', trigger: 'blur' },
                    ],
                    expiredDate: [
                        { type: 'date', required: true, message: '请选择过期时间', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写备注', trigger: 'blur' },
                        { min: 6, message: '客官，请多写一点吧', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: _.extend({},mapActions(['addNewTable']),{
            onSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.addNewTable(this.form).then(response => {
                            this.$message.success('添加备案信息成功！');
                            this.$router.push('/tableList');
                        }, error => {
                            this.$message.error('添加备案失败，请检查网络！');
                        })
                    } else {
                        return false;
                    }
                });
            },
            gotoTest(){
                let url = "http://www.dooccn.com/python3/#id/f7a83644e0ad6f5eb40a99ebbc2bf75b";
                window.open(url,"_blank");
            },
            onCancel(){
                this.$router.push('/tableList');
            }
        })
    }
</script>

<style scoped>
    .form-box{
        width: 640px;
    }
</style>
