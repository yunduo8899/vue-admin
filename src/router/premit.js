import router from "./index.js";
import {getToken} from "@/tool/app.js";

const writeRouter = ['/login'];

router.beforeEach((to,from,next) => {
    if(getToken() && getToken() !== 'null'){
        next();
    }else{
        if(writeRouter.indexOf(to.path) == -1){
            next('/login');
        }else{
            next();
        }
    }
})
