import cookie from "cookie_js";

const adminToken = 'adminToken';
const username = 'username';

/**
 * 获取cookie
*/
export function getToken(){
    return cookie.get(adminToken);
}

export function getUsername(){
    return cookie.get(username);
}

/**
 * 设置cookie
*/
export function setToken(value){
    return cookie.set(adminToken,value);
}

export function setUsername(value){
    return cookie.set(username,value);
}



/**
 * 移除cookie
*/
export function removeToken(){
    return cookie.remove(adminToken);
}

export function removeUsername(){
    return cookie.remove(username);
}