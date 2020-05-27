import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app.js";
import login from "./modules/login.js";

Vue.use(Vuex);
/**
 * 相当于各组件共用的临时仓库，用来放数据处理函数
 */
export default new Vuex.Store({
  //初始化数据
  state: {},  
  
  //修改state数据 只能处理同步  不能处理回调
  mutations: {
    test(){
      console.log(111);
    }
  },

  //同步异步皆可，可以处理回调
  actions: {},

  //模块化
  modules: {
    app,
    login,
  }
});
