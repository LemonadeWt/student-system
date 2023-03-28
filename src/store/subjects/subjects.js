import api from '../../http/api'

export default {
    namespaced: true,
    state: {
        rows: [],
        total: 0,
        pages: 0
    },
    getters: {

    },
    mutations: {
        //设置专业数据
        SET_SUBJECTS_DATA(state, payload) {
            Object.assign(state, payload)
        }

    },
    actions: {
        //获取专业数据
        async getSubjectsAsync(context, payload) {
            const { data } = await api.subjectsAPI.getSubjectsList(payload);
            // console.log(data);
            if (data.code) {
                context.commit('SET_SUBJECTS_DATA', data.data);
            }
        }
    }
}