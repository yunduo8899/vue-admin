import axios from 'axios'
import { Message } from 'element-ui'

const BASEURL = process.env.VUE_APP_MODE === 'production' ? process.env.VUE_APP_API : process.env.VUE_APP_API;

var myaxios = axios.create({
    baseURL: BASEURL,
    timeout: 10000,
});

// 添加请求拦截器
myaxios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log(config);
    // config.headers['userID']='3333333';
    return config;
    }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myaxios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    let data = response.data;
        if(data.resCode !== 0){
            Message.error(data.msg);
            return Promise.reject(data);
        }else{
            return response;
        }
    }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

//导出自定义axios 实例
export default myaxios;