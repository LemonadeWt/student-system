<template>
    <el-row>
        <el-col :span="12">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="学生姓名" prop="name">
                    <el-input v-model="ruleForm.name" clearable placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="学生年龄" prop="age">
                    <el-input v-model="ruleForm.age" clearable placeholder="请输入年龄"></el-input>
                </el-form-item>
                <el-form-item label="学生性别" prop="gender">
                    <el-radio-group v-model="ruleForm.gender">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="学生专业" prop="subjectsId">
                    <el-select v-model="ruleForm.subjectsId" placeholder="请选择专业">
                        <el-option v-for="item in subjectsData" :key="item._id" :label="item.name"
                            :value="item._id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学生班级" prop="classesId">
                    <el-select v-model="ruleForm.classesId" placeholder="请选择班级">
                        <el-option v-for="item in classesData" :key="item._id" :label="item.name"
                            :value="item._id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="updateStudents('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button @click="backtohome">返回</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="12" style="text-align: center;">
            <AvatarUpload @setImagePath="getImagePath" :imgPath="ruleForm.imagePath"></AvatarUpload>
        </el-col>
    </el-row>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState: studentsMapState, mapActions: studentsMapActions } = createNamespacedHelpers('students');
const { mapState: subjectsMapState, mapActions: subjectsMapActions } = createNamespacedHelpers('subjects');
const { mapState: classesMapState, mapActions: classesMapActions } = createNamespacedHelpers('classes');
import AvatarUpload from '../../components/AvatarUpload.vue'
export default {
    components: {
        AvatarUpload
    },
    // props: ['id'],
    data() {
        return {
            studentData: null,
            ruleForm: {
                _id: '',
                name: '',
                age: '',
                gender: '',
                subjectsId: '',
                classesId: '',
                imagePath: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                age: [
                    { required: true, message: '年龄不能为空' },
                    // { type: 'number', message: '年龄必须为数字值' }
                ],
                gender: [
                    { required: true, message: '请选择学生性别', trigger: 'change' }
                ],
                subjectsId: [
                    { required: true, message: '请选择学生专业', trigger: 'change' }
                ],
                classesId: [
                    { required: true, message: '请选择学生课程', trigger: 'change' }
                ],
            }

        }
    },
    created() {
        //路径上写参数和params传都是这个方法接收
        this.ruleForm._id = this.$route.params._id;
        // const id = this.$route.query.id;
        this.getStudentById(this.ruleForm._id);
        // console.log(this.$route.query.name);
        //获取专业数据，用于专业选择下拉框
        this.getSubjectsAsync();
    },
    computed: {
        ...subjectsMapState({
            subjectsData: 'rows',
            total: 'total',
            pages: 'pages'
        }),
        ...classesMapState({
            classesData: 'rows',
            total: 'total',
            pages: 'pages'
        })
    },
    watch: {
        // 'ruleForm.subjectsId':{
        //     handler(newVal,oldVal){

        //     }
        // }
        'ruleForm.subjectsId'() {
            this.getClassesBySubjectsId()
        }
    },
    methods: {
        ...studentsMapActions(['getStudentByIdAsync', 'updateStudentsAsync']),
        ...subjectsMapActions(['getSubjectsAsync']),
        ...classesMapActions(['getClassesBySubjectsIdAsync']),
        //修改学生信息
        updateStudents(formName) {
            console.log(this.ruleForm);
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    const data = await this.updateStudentsAsync(this.ruleForm);
                    // console.log(data);
                    if (data.code) {
                        this.$message({
                            message: '修改成功！',
                            type: 'success'
                        });
                        this.$router.push('/home/studentList')
                    }
                } else {
                    return false;
                }
            });
        },
        async getStudentById(id) {
            const data = await this.getStudentByIdAsync({ _id: id });
            // console.log(data);
            this.ruleForm = data.data;

        },
        //获取专业数据
        getSubjectsList() {
            this.getSubjectsAsync()
        },
        //根据下拉框中的专业数据获取班级下拉框的数据
        getClassesBySubjectsId() {
            this.getClassesBySubjectsIdAsync({ subjectsId: this.ruleForm.subjectsId })
        },
        //返回学生列表
        backtohome() {
            this.$router.push('/home/studentList')
        },
        //获取头像上传组件返回的imagePath值
        getImagePath(imagePath) {
            this.ruleForm.imagePath = imagePath
        },

        resetForm(formName) {
            //重置表单内容
            this.$refs[formName].resetFields();
        },

    }

}

</script>
<style lang="scss" scoped>
.el-row {}
</style>