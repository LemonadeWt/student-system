<template>
    <div>
        <el-table class="studentsTable" :data="studentsData" border stripe style="width: 100%" height="460">
            <!-- <el-table-column prop="name" label="学号" width="80" show-overflow-tooltip v-if="false">
            </el-table-column> -->
            <el-table-column prop="name" label="姓名" width="80" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="age" label="年龄" width="80" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="gender" label="性别" width="80" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="subjectsId.name" label="专业" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="classesId.name" label="班级" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="imagePath" label="头像" width="80" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-avatar size="small" :src="scope.row.imagePath"></el-avatar>
                </template>

            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button type="text" @click="viewStuInfo(scope.row)">查看</el-button>
                    <el-button type="text" @click="updateStuInfo(scope.row)">编辑</el-button>
                    <!-- <el-button type="text">
                        <router-link :to="`/home/studentUpdate/${scope.row._id}`">编辑</router-link>
                    </el-button> -->
                    
                    <el-button type="text" @click="deleteStuInfo(scope.row)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="pageData.currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pageData.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <!-- 学生信息弹出框 -->
        <el-dialog title="学生信息" :visible.sync="dialogTableVisible">

            <el-descriptions title="" v-if="studentDataOne">
                <el-descriptions-item label="学生姓名">{{ studentDataOne.name }}</el-descriptions-item>
                <el-descriptions-item label="学生性别">{{ studentDataOne.gender }}</el-descriptions-item>
                <el-descriptions-item label="学生年龄">{{ studentDataOne.age }}</el-descriptions-item>
                <el-descriptions-item label="学生班级">{{ studentDataOne.classesId?studentDataOne.classesId.name:'暂无' }}</el-descriptions-item>
                <el-descriptions-item label="学生专业">{{studentDataOne.subjectsId? studentDataOne.subjectsId.name:'暂无' }}</el-descriptions-item>
            </el-descriptions>
        </el-dialog>


    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapActions, mapState } = createNamespacedHelpers('students');
export default {
    data() {
        return {
            dialogTableVisible: false,
            studentDataOne: null,
            pageData: {
                pageSize: 5,
                currentPage: 1
            }

        }
    },
    computed: {
        // ...mapState(['studentsData']),
        ...mapState({
            studentsData: 'studentsData',
            total: 'total',
            pages: 'pages',
            code: 'code'
        }),
    },
    watch: {
        pageData: {
            handler(val) {
                this.getStudents();
            },
            deep: true,
            // immediate: true
        },

    },
    created() {
        this.getStudents()
    },
    methods: {
        ...mapActions(['getStudentsAsync']),
        handleSizeChange(val) {
            this.pageData = {
                ...this.pageData,
                pageSize: val
            }
        },
        handleCurrentChange(val) {
            this.pageData = {
                ...this.pageData,
                currentPage: val
            }
        },
        getStudents() {
            this.getStudentsAsync(this.pageData)

        },
        // 查看学生信息
        viewStuInfo(row) {
            this.dialogTableVisible = true;
            // console.log(row);
            this.studentDataOne = row
            // this.loadStuInfo(row)
        },
        // 删除学生信息
        deleteStuInfo() {
            this.$confirm('此操作（假删除）将永久删除该学生数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 修改学生信息
        updateStuInfo(row){
            this.$router.push({name:"studentUpdate",params:{_id: row._id,name:'123'}});
            // this.$router.push({path:"/home/studentUpdate",query:{id: row._id,name:'123'}});
            // this.$router.push({path:`/home/studentUpdate/${row._id}/`})
        }

    }
}
</script>

<style lang="scss" scoped>
.el-table {
    ::v-deep .el-table__cell {
        padding: 0;
        height: 30px;
        line-height: 30px;
    }
}

.el-pagination {
    margin-top: 20px;
}
</style>