import axios from 'axios'

export default {
    // 获取专业列表数据
    getSubjectsList(params){
        return axios({
            url:'/subjects/getSubjects',
            method:'GET',
            params
        })
    },
}