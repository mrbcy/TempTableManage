<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/tableList'}"><i class="el-icon-date"></i> 临时表备案</el-breadcrumb-item>
                <el-breadcrumb-item>新备案</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="临时表名">
                    <el-input v-model="form.tableExp" placeholder="支持正则表达式，如：^tmp.user_tmp_(.*)$"></el-input>
                </el-form-item>
                <el-form-item label="测试">
                    <el-col :span="19">
                        <el-input v-model="form.testName" placeholder="输入想保留的表名"></el-input>
                    </el-col>
                    <el-col class="line" :span="1">&nbsp;</el-col>
                    <el-col :span="2">
                        <el-form-item>
                            <el-button type="success" @click="">保留测试</el-button>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="过期时间">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="过期后表被删除" v-model="form.expiredDate" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" :rows="4" v-model="form.desc"></el-input>
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
    export default {
        data: function(){
            return {
                form: {
                    tableExp: '',
                    testName: '',
                    expiredDate: '',
                    desc: ''
                }
            }
        },
        methods: {
            onSubmit() {
                this.$message.success('提交成功！');
            },
            onCancel(){
                this.$router.push('/tableList');
            }
        }
    }
</script>

<style scoped>
    .form-box{
        width: 640px;
    }
</style>
