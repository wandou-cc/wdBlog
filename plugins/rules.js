
let validateNew = (rule, value, callback) => {
    if (/[\u4e00-\u9fa5]/.test(value)) {
        callback(new Error("密码不可为中文"));
    } else if (/\s+/g.test(value)) {
        callback(new Error("密码不可为空格"));
    } else if (value === '') {
        callback(new Error('密码不能为空'));
    } else {
        callback();
    }
};

let validateUserName = (rule, value, callback) => {
    if (/[\u4e00-\u9fa50-9A-Za-z]/.test(value)) {
        callback();
    } else {
        callback(new Error('请输入汉字字母数字'));
    }
};

let validateUserEmail = (rule, value, callback) => {
    if (/^([a-zA-Z0-9_-])+@([a-zA-Z0-9-])+((\.[a-zA-Z0-9-]{2,3}){1,2})$/.test(value)) {
        callback();
    } else {
        callback(new Error('邮箱格式不正确'));
    }
};
// 


export {
    validateUserName,
    validateUserEmail,
    validateNew
}