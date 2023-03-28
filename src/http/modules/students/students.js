import axios from 'axios'

export default {
    // 获取学生列表数据
    getStudentsList(params){
        return axios({
            url:'/students/getStudents',
            method:'GET',
            params
        })
    },
    //根据学生id获取学生信息
    getStudentById(params){
        return axios({
            url:'/students/getStudentsById',
            method:'GET',
            params
        })
    },
    //根据学生id修改学生数据
    updateStudents(data) {
        return axios({
            url:'/students/updateStudents',
            method:'PUT',
            data
        })
    },
}