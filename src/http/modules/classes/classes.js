import axios from 'axios'

export default {
    // 获取班级列表数据
    getClassesList(params){
        return axios({
            url:'/classes/getClasses',
            method:'GET',
            params
        })
    },
    //根据专业id获取班级数据
    getClassesBySubjectsId(params){
        return axios({
            url:'/classes/getClassesBySubjectsId',
            method:'GET',
            params
        })
    }
}