const state = {
    isCollapse: JSON.parse(window.sessionStorage.getItem('isCollapse')) ||false,
};
const getters = {};

const mutations = {
    SET_COLLAPSE(state){
        state.isCollapse = !state.isCollapse;
        window.sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse));
      }
};
const actions = {};

export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions,
};