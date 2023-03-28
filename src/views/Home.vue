<template>
    <el-container class="container">
        <el-header height="85px">
            <!-- 学校logo -->
            <el-row>
                <el-col :span="12">
                    <el-image :src="logoUrl" style="width: 58px; height: 58px" fit="contain"></el-image>
                    <div class="schoolName">xx院校学生管理系统</div>
                </el-col>
                <el-col :span="12" class="userInfo">
                    <el-dropdown class="username">
                        <span class="el-dropdown-link">
                            admin12344555
                            <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-user">
                                <el-link :underline="false">个人中心</el-link>
                            </el-dropdown-item>
                            <el-dropdown-item icon="el-icon-setting">
                                <el-link :underline="false">账号设置</el-link>
                            </el-dropdown-item>
                            <el-dropdown-item icon="el-icon-edit">
                                <el-link :underline="false">意见反馈</el-link>
                            </el-dropdown-item>
                            <el-dropdown-item icon="el-icon-close">
                                <el-link :underline="false" href="#/login">退出系统</el-link>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    <span class="celebretion">欢迎你，普通管理员</span>

                </el-col>
            </el-row>
<!-- GIT测试 -->
        </el-header>
        <el-container>
            <el-aside width="200px">
                <!-- 导航菜单 -->
                <Siderbar></Siderbar>
            </el-aside>
            <el-main>
                <el-card class="box-card">
                    <template v-if="$route.meta.title != 'index'">
                        <div slot="header" class="clearfix">
                            <!-- 点击面包屑导航到首页时判断是否显示面包屑导航 -->
                            <Breadcrumb></Breadcrumb>
                        </div>
                    </template>
                    <router-view></router-view>
                </el-card>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'
import Siderbar from '../components/Sidebar.vue'
import Breadcrumb from '../components/Breadcrumb.vue'
export default {

    components: {
        Siderbar,
        Breadcrumb
    },
    data() {
        return {
            logoUrl: require('../assets/images/school.png')
        }
    }
}
</script>
<style lang="scss" scoped>
.container {
    // border: 1px solid red;
    // overflow:scroll;
    height: 99.9vh;

    .el-header {
        // border: 1px solid red;
        background-color: #fff;
        border-bottom: 2px solid #f3f3f3;

        .el-row {
            height: 59px;

            .el-image {
                display: block;
                float: left;
                margin-top: 14px;
            }

            .schoolName {
                float: left;
                height: 85px;
                line-height: 85px;
                margin-left: 15px;

            }

            .userInfo {
                height: 85px;
                line-height: 85px;

                .celebretion {
                    display: block;
                    float: right;
                    margin-right: 20px;
                }

                .el-avatar {
                    display: block;
                    float: right;
                    margin-top: 20px;
                    border: 1px solid #409EFF;
                }

                .username {
                    .el-dropdown-link {
                        &:hover {
                            color: #409EFF;
                            cursor: pointer;
                        }
                    }


                    display: block;
                    float: right;
                    margin: 0 10px;
                }
            }
        }

    }

    .el-aside {
        // border: 1px solid red;
        box-sizing: border-box;
        background: #fff;
    }

    .el-main {
        box-sizing: border-box;
        // border: 1px solid red;
        .box-card{
            height: 99%;
        }
    }
}
</style>
