import {vlogin} from "@/api/login.js";
import {setToken , setUsername, getUsername} from "@/tool/app.js";

const state = {
    admin_token : '',
    user_name : getUsername() || '',
};
const getters = {};
const mutations = {
    set_admin_token(state,value){
        state.admin_token = value;
    },

    set_user_name(state,value){
        state.user_name = value;
    },
};
const actions = {
    login(content,requestData){
        return new Promise((resolve,reject)=>{
            vlogin(requestData).then(response=>{
                let data = response.data.data;
                setToken(data.token);
                setUsername(data.username);
                content.commit('set_admin_token',data.token);
                content.commit('set_user_name',data.username);
                resolve(response);
            }).catch(error=>{
                reject(error);
            })
        })
    }
};

export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions,
}