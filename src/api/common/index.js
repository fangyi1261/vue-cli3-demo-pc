import { getRequest, postRequest } from '@/api/index'; // @/api

const urlsObj = {};
const env = process.env.NODE_ENV;
const obj = {
  development: '',
  stg: `http://${window.location.host}`
};

export const url = obj[env];

// 获取token
urlsObj.goLogin = getRequest('login');
// 获取动态路由
urlsObj.getRoutes = getRequest('routes');
// 获取用户信息
urlsObj.getUserInfo = getRequest('userInfo');
// 获取um账号
urlsObj.getUserAccount = getRequest(`${url}/api/renewal-rule/user/getUserInfo`);
// 获取菜单信息
urlsObj.getMenus = getRequest(`${url}/api/renewal-rule/user/getMenus`);
// 后端记录登陆的用户信息
urlsObj.getRecordLogin = postRequest(`${url}/api/renewal-rule/user/login`);

export default urlsObj;
