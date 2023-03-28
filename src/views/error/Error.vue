<template>
    <div>
        <el-empty 
        description="页面出错了，请返回登录页面，重新登录"
        :image="errorUrl"
        :image-size="300"
        >
            <el-link type="primary" href="/login">前往登录>>></el-link>
        </el-empty>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                errorUrl: require('../../assets/images/error.png')
            }
        }
    }
</script>
<style lang="scss" scoped>
    .el-empty{
        padding: 50px 0;
        color: #848484;
        font-weight: bolder;
    }
</style>