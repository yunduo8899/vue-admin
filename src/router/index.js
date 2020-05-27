import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/Layout/index.vue";

Vue.use(VueRouter);

const routes = [
  /**
   * 项目首页
   */
  {
    path: "/",
    redirect:"/login",
    hidden:true,
    meta:{
      name:"项目首页"
    }
  },
  /**
   * 登录注册模块
   */
  {
    path: "/login",
    name: "Login",
    hidden:true,
    component: () => import( "../views/Login/index.vue"),
    meta:{
      name:"登录"
    }
  },
  /**
   * 控制台模块
   */
  {
    path: "/layout",
    name: "Layout",
    redirect: "/console",
    hidden: false,
    component:Layout,
    meta:{
      name:"控制台",
      icon:"console",
    },
    children:[
      {
        path: "/console",
        name: "Console",
        hidden: false,
        component: () => import("../views/Console/index.vue"),
        meta:{
          name: "首页",
        }
      },
    ],
  },
  /**
   * 信息模块
   */
  {
    path: "/info",
    name: "Info",
    component: Layout,
    redirect:"/info/list",
    hidden:false,
    meta:{
      name:"信息管理",
      icon:"info",
    },
    children:[
      {
        path: "/info/list",
        name: "InfoList",
        hidden:false,
        component: () => import( "../views/Info/components/list.vue"),
        meta:{
          name:"信息列表"
        },
      },
      {
        path: "/info/category",
        name: "InfoCategory",
        hidden:false,
        component: () => import( "../views/Info/components/category.vue"),
        meta:{
          name:"信息分类"
        },
      },
    ]
  },
  /**
   * 用户模块
   */
  {
    path: "/user",
    name: "User",
    component: Layout,
    hidden:false,
    meta:{
      name:"用户管理",
      icon: "user"
    },
    children:[
      {
        path: "/user/list",
        name: "UserList",
        hidden: false,
        component: () => import("../views/User/components/list.vue"),
        meta:{
          name:"用户列表",
        }
      },
    ],
  },
  
];

const router = new VueRouter({
  routes
});

export default router;
