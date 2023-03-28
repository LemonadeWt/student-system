import api from '../../http/api'

export default {
    // namespaced是关键，模块化，不会合并到index.js里
    namespaced: true,
    state: {
        studentsData:[],
        total: 0,
        pages: 0,
        code:''

    },
    getters: {
    },
    mutations: {
        SET_STUDENTS_DATA(state,payload){
            state.studentsData = payload.data.rows;
            state.total = payload.data.total;
            state.pages = payload.data.pages;
            state.code = payload.code;
        }
    },
    actions: {
        // 获取学生列表数据
        async getStudentsAsync(context, payload) {
            const { data } = await api.studentsAPI.getStudentsList(payload);
            // console.log(data);
            if (data.code) {
                context.commit('SET_STUDENTS_DATA',data)
            }
        },
        // 根据学生id获取学生信息
        async getStudentByIdAsync(context,payload){
            // console.log(payload);
            const {data} = await api.studentsAPI.getStudentById(payload);
            // console.log(data);
            return data;
        },
        //根据学生id修改学生数据
        async updateStudentsAsync(context, payload){
            const {data} = await api.studentsAPI.updateStudents(payload);
            return data
        }
    }
}
