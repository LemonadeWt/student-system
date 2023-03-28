import axios from 'axios'

export default {
    // 用户登录
    login(data){
        return axios({
            url:'/users/login',
            method: 'POST',
            data
        })
    }
}