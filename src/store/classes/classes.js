import api from '../../http/api'

export default {
    namespaced:true,
    state:{
        rows:[],
        total:0,
        pages:0
    },
    getters:{

    },
    mutations:{
        //设置专业数据
        SET_CLASSES_DATA(state, payload){
            Object.assign(state, payload)
        }

    },
    actions:{
        //根据专业id获取班级数据
        async getClassesBySubjectsIdAsync(context,payload){
            const {data} = await api.classesAPI.getClassesBySubjectsId(payload);
            if(data.code){
                context.commit('SET_CLASSES_DATA',data.data)
            }
        }
    }
}