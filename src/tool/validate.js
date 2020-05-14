/**
 * 删除字符串中的特殊字符
 */

export function stripscript(s) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]"); 
    var rs = ""; 
    for (var i = 0; i < s.length; i++) {
        rs = rs+s.substr(i, 1).replace(pattern, ''); 
    } 
    return rs;
}

/**
 * 验证邮箱，export导出
 */
export function validateEmail(email){
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z0-9]{2,5})$/;
    return reg.test(email) ? true : false;
}
