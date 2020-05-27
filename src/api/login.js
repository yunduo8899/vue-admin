import myaxios from "@/api/request"

/**
 * 获取验证码
 */
export function getsms(data){
    // console.log(process.env);
    return myaxios.request({
        method:"post",
        url:"/code",
        data:data
    })
}

/**
 * 注册
 */
export function register(data){
    // console.log(process.env);
    return myaxios.request({
        method:"post",
        url:"/reg",
        data:data
    })
}

/**
 * 登录
 */
export function vlogin(data){
    // console.log(process.env);
    return myaxios.request({
        method:"post",
        url:"/login",
        data:data
    })
}
