<template>
    <el-menu
            :default-active="$route.path" 
            @open="handleOpen" 
            @close="handleClose"
            :unique-opened = "true"
            active-text-color="#409EFF"
            :router="true"
            >
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>学生管理</span>
            </template>
            <el-menu-item index="/home/studentList">学生列表</el-menu-item>
            <el-menu-item index="1-2">新增学生</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-s-grid"></i>
                <span>班级管理</span>
            </template>
            <el-menu-item index="1-1">班级列表</el-menu-item>
            <el-menu-item index="1-2">新增班级</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title">
                <i class="el-icon-tickets"></i>
                <span>专业管理</span>
            </template>
            <el-menu-item index="1-1">专业列表</el-menu-item>
            <el-menu-item index="1-2">新增专业</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
            <template slot="title">
                <i class="el-icon-reading"></i>
                <span>课程管理</span>
            </template>
            <el-menu-item index="1-1">课程列表</el-menu-item>
            <el-menu-item index="1-2">新增课程</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
            <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span>教师管理</span>
            </template>
            <el-menu-item index="1-1">教师列表</el-menu-item>
            <el-menu-item index="1-2">新增教师</el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
    methods: {
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        }
    }
}
</script>

<style lang="scss" scoped>
.el-menu{
    border-right: none;
    overflow: hidden ;
}

</style>