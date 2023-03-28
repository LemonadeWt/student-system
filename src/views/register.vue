<template>
    <el-container class="registerContainer">
        <el-card class="box-card">
            <div slot="header">
                注册账号
            </div>
            <!-- 登录界面 -->
            <el-form ref="ruleForm" :model="ruleForm" label-width="90px" :rules="rules">
                <el-form-item label="账号：" prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入账号" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码" clearable></el-input>
                </el-form-item>
                <el-form-item label="确认密码：" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" placeholder="请输入确认密码" clearable></el-input>
                </el-form-item>

                <el-form-item label-width="0px">
                    <el-button type="primary" @click="registerSubmit('ruleForm')">注册</el-button>
                    <el-button plain @click="$router.push('/login')">取消</el-button>
                </el-form-item>
            </el-form>

        </el-card>
    </el-container>
</template>

<script>
export default {
    data() {
        var checkAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入账号'));
            } else if (value.length < 3 || value.length > 10) {
                return callback(new Error('账号长度为3到10个字符'));
            } else {
                callback()
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if(value.length < 3 || value.length > 10){
                return callback(new Error('密码长度为3到10个字符'));
            }else{
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                username: '',
                password: '',
                checkPass: ''
            },
            rules: {
                username: [
                    { validator: checkAge, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],

            }
        };
    },
    mounted() {
        this.ruleForm = {
            username: '',
            password: '',
            checkPass: ''
        }
    },
    methods: {
        registerSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

    }
}
</script>

<style lang="scss" scoped>@import "../assets/style/register/register.scss";</style>