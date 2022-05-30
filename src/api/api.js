import axios from 'axios';

const baseURL = '/api'
    /**
     * 请求体配置
     * **/
function getConfig() {
    return {
        baseURL,
        headers: {
            authorization: sessionStorage.getItem('token')
        }
    }
}

/**
 * @description 获取验证码
 * **/
export function getCaptchaApi() {
    // const baseURl = '/api'
    return `${baseURL}/captcha?${Math.random()}`
}

/**
 * @description 登录接口
 * @param params <Object> <username,password,captcha>
 * **/
export function loginApi(params = {}) {
    return axios.post('/user/login', params, getConfig())
}

/**
 * @description 注册接口
 * @param params <Object> <username,password,email,phone,captcha>
 * **/
export function registerApi(params = {}) {
    return axios.post('/user/register', params, getConfig())
}

/**
 * @description 退出接口
 * @param params <Object> 
 * **/
export function logoutApi(params = {}) {
    return axios.post('/user/logout', params, getConfig())
}

/**
 * @description 查询用户信息接口
 * @param params <Object>  
 * **/
export function infoApi(params = {}) {
    return axios.post('/user/info', params, getConfig())
}

/**
 * @description 修改用户信息接口
 * @param params <Object>  
 * @param params.phone          //手机号 
 * @param params.email          //邮箱 
 * @param params.sex            //性别 1 ： 男   0： 女
 * @param params.avatarName     //昵称
 * @param params.name           //真实姓名
 * @param params.provinceNo     //省编号
 * @param params.cityNo         //市编号
 * @param params.areaNo         //区编号
 * @param params.townNo         //镇编号
 * @param params.deso           //个人介绍
 * **/
export function updateInfoApi(params = {}) {
    return axios.post('/user/update', params, getConfig())
}



/**
 * @description 查询题目接口
 * @param params <Object>  
 * @param params.type         必填项   题目类型  1：单选题  2：多选题  3：填空题  4：问答题   注：暂只支持单选
 * @param params.pagination   非必填   表示是否需要分页  如果传 false：不分页   true:分页   默认不传是分页
 * @param params.pageSize     非必填   每页获取几条数据  如果不传 默认是获取10条
 * @param params.pageNum      非必填   想获取第几页的数据  如果不传 默认是第1页
 * @param params.title        非必填  题目标题 模糊查询
 * **/
export function listQuestionApi(params = {}) {
    return axios.post('/question/list', params, getConfig())
}

/**
 * @description 删除题目接口
 * @param params <Object>  
 * @param params.id    必填    题目id
 * @param params.type  必填    题目类型
 * **/
export function deleteQuestionApi(params = {}) {
    return axios.post('/question/delete', params, getConfig())
}

/**
 * @description 更新题目接口
 * @param params <Object>
 * @param params.id       必填    题目id
 * @param params.type       必填    题目类型
 * @param params.title      必填    题目标题
 * @param params.questionA  必填    选项a
 * @param params.questionB  必填    选项b
 * @param params.questionC  非必填    选项c
 * @param params.questionD  非必填    选项d
 * @param params.answer     必填   答案
 * @param params.level      必填   难度系数  1：简单  2：普通 3：困难
 * **/
export function updateQuestionApi(params = {}) {
    return axios.post('/question/update', params, getConfig())
}


/**
 * @description 创建题目接口
 * @param params <Object>
 * @param params.type       必填    题目类型
 * @param params.title      必填    题目标题
 * @param params.questionA  必填    选项a
 * @param params.questionB  必填    选项b
 * @param params.questionC  非必填    选项c
 * @param params.questionD  非必填    选项d
 * @param params.answer     必填   答案
 * @param params.level      必填   难度系数  1：简单  2：普通 3：困难
 * **/
export function createQuestionApi(params = {}) {
    return axios.post('/question/create', params, getConfig())
}

/**
 * @description 查询所有用户接口
 * @param params <Object>
 * @param params.pagination : <boolean>非必填  表示是否需要分页  如果传 false：不分页   true:分页   默认不传是分页; 
 * @param params.pageSize   : <number>非必填  每页获取几条数据  如果不传 默认是获取10条
 * @param params.pageNum    : <number>非必填  想获取第几页的数据  如果不传 默认是第1页
 * **/
export function queryUserlistApi(params = {}) {
    return axios.post('/user/list', params, getConfig())
}

/**
 * @description 创建任务接口
 * @param params <Object>
 * @param params.name       <string>, //任务名称
 * @param params.desc       <string>, //任务描述
 * @param params.duration    <number>,  //任务时长
 * @param params.level        <number>,  // 任务等级  1：紧急  0：普通任务
 * **/
export function createTaskApi(params = {}) {
    return axios.post('/task/create', params, getConfig())
}

/**
 * @description 发布任务接口
 * @param params <Object>
 * @param params.userid       <array[<number>]>,  //用户id，  如果给多个人发送任务，可以传数组，数组中是每一个人的
 * @param params.taskId       number,  //任务id   
 * **/
export function replaseTaskApi(params = {}) {
    return axios.post('/task/release', params, getConfig())
}

/**
 * @description 查询任务列表接口
 * @param params <Object>
 * @param params.taskName            <string>      //非必填  模糊查询  根据任务名进行
 * @param params.pagination          <boolean>,    //非必填  表示是否需要分页  如果传 false：不分页   true:分页   默认不传是分页;
 * @param params.pageSize            <number>,     //非必填  每页获取几条数据  如果不传 默认是获取10条； 
 * @param params.pageNum             <number>,     //非必填  想获取第几页的数据  如果不传 默认是第1页；
 * **/
export function getTaskListApi(params = {}) {
    return axios.post('/task/list', params, getConfig())
}

/**
 * @description 查询某个任务接口
 * @param params <Object>
 * @param params.taskId       <number>,    //任务id
 * **/
export function getTaskDetailApi(params = {}) {
    return axios.post('/task/detail', params, getConfig())
}

/**
 * @description 角色列表接口
 * @param params.pagination      <boolean>,    //非必填  表示是否需要分页  如果传 false：不分页   true:分页   默认不传是分页; 
 * @param params.pageSize   : <number>,     //非必填  每页获取几条数据  如果不传 默认是获取10条；
 * @param params.pageNum <number>,     //非必填  想获取第几页的数据  如果不传 默认是第1页；
 * **/
export function getRolelistApi(params = {}) {
    return axios.post('/role/list', params, getConfig())
}

/**
 * @description 角色分组列表接口
 * @param params.pagination      <boolean>,    //非必填  表示是否需要分页  如果传 false：不分页   true:分页   默认不传是分页; 
 * @param params.pageSize   : <number>,     //非必填  每页获取几条数据  如果不传 默认是获取10条；
 * @param params.pageNum <number>,     //非必填  想获取第几页的数据  如果不传 默认是第1页；
 * **/
export function getRoleGrouplistApi(params = {}) {
    return axios.post('/roleGroup/list', params, getConfig())
}

/**
 * @description 创建角色接口
 * @param params.roleName:          <string>, //角色名字
 * @param paramsgroupId :           <number>,  //分组id  非必填
 * **/
export function createRoleApi(params = {}) {
    return axios.post('/role/create', params, getConfig())
}