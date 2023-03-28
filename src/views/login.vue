<template>
    <el-container class="loginContainer">
        <el-card class="box-card">
            <div slot="header">
                账号登录
            </div>
            <!-- 登录界面 -->
            <el-form ref="loginForm" :model="loginForm" label-width="70px" :rules="rules">
                <el-form-item label="账号：" prop="username">
                    <el-input v-model="loginForm.username" placeholder="请输入账号" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input v-model="loginForm.password" placeholder="请输入密码" clearable></el-input>
                </el-form-item>
                <el-form-item label-width="0px">
                    <el-checkbox v-model="loginForm.isChecked">
                        阅读并接受
                        <el-link type="primary">《登录用户协议》</el-link>
                        和
                        <el-link type="primary">《隐私政策》</el-link>
                    </el-checkbox>
                </el-form-item>
                <el-form-item label-width="0px">
                    <el-button type="primary" @click="loginSubmit('loginForm')" @keyup.enter="keyDown(e)">登录</el-button>
                </el-form-item>
            </el-form>
            <div class="footer">
                <el-avatar size="small" :src="linkImage.QQUrl"></el-avatar>
                <el-avatar size="small" :src="linkImage.wbUrl"></el-avatar>
                <el-avatar size="small" :src="linkImage.wxUrl"></el-avatar>
                <el-link :underline="false" href="#/register">没有账号？去注册</el-link>
            </div>
        </el-card>
    </el-container>
</template>

<script>
export default {
    data() {
        var checkAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入账号'));
            }else if(value.length < 3 || value.length > 10){
                return callback(new Error('账号长度为3到10个字符'));
            }else {
                callback()
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if(value.length < 3 || value.length > 10){
                return callback(new Error('密码长度为3到10个字符'));
            }else {
                callback()
            }
        };
        return {
            user: {
                username: '123',
                password: '123'
            },
            loginForm: {
                username: '',
                password: '',
                isChecked: false
            },
            linkImage: {
                QQUrl: require('../assets/images/qq.png'),
                wbUrl: require('../assets/images/wb.png'),
                wxUrl: require('../assets/images/wx.png'),
            },
            rules: {
                username: [
                    { validator: checkAge, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],

            }
        }
    },
    mounted(){
        window.addEventListener('keyup',this.keyDown);
    },
    destroyed(){
        window.removeEventListener('keyup',this.keyDown,false);
    },
    methods: {
        //按下enter键登录
        keyDown(e){
            // console.log(e.keyCode);
            if(e.keyCode == 13)
            this.loginSubmit('loginForm')
        },
        loginSubmit(formName) {
            // console.log(this);
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 输入验证完成后，发送登录请求
                    this.login();
                } else {
                    return false;
                }
            });
        },
        async login() {
            //此处没有使用状态机vuex(store)
            const { data } = await this.$api.usersAPI.login(this.user);
            //  console.log(data);
            //登录成功，保存token信息,跳转首页
            if (data.code) {
                localStorage.sysToken = data.token;
                this.$message({
                    showClose: true,
                    center: true,
                    duration: 1500,
                    message: '您已登录成功！',
                    type: 'success'
                });
                this.$router.push("/home")
            }else{
                this.$message({
                    showClose: true,
                    center: true,
                    duration: 1500,
                    message: '登录失败，账号或者密码错误！',
                    type: 'error'
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/style/login/login.scss";
</style>