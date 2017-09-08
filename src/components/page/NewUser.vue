<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/userList'}"><i class="el-icon-upload"></i> 用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加用户</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="用户名" prop="_id">
                    <el-input v-model="form._id" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="pw" label="密码">
                    <el-input v-model="form.pw" placeholder="默认密码：123456" type="password"></el-input>
                </el-form-item>
                <el-form-item label="用户角色" prop="role">
                    <el-checkbox-group v-model="form.role">
                        <el-checkbox label="user" disabled></el-checkbox>
                        <el-checkbox label="admin"></el-checkbox>
                    </el-checkbox-group>
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
    import md5 from 'js-md5';

    export default {
        data: function(){
            return {
                form: {
                    _id : "",
                    pw : "123456",
                    role : ['user']
                },
                rules: {
                    _id: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    pw: [
                        { required: true, message: '请输入密码', trigger: 'change' }
                    ],
                    role: [
                        { type: 'array', required: true, message: '请选择角色', trigger: 'change' }
                    ]
                }
            }
        },
        methods: _.extend({},mapActions(['addNewUser']),{
            onSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.form.pw = md5(this.form.pw);
                        this.addNewUser(this.form).then(response => {
                            this.$message.success('添加用户成功！');
                            this.$router.push('/userList');
                        }, error => {
                            this.$message.error('添加用户失败，请检查网络！');
                        })
                    } else {
                        return false;
                    }
                });
            },
            onCancel(){
                this.$router.push('/userList');
            }
        })
    }
</script>

<style scoped>
    .form-box{
        width: 640px;
    }
</style>
