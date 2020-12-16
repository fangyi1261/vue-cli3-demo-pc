import ComAPI from '@/api/common';
import { getToken, setToken, removeToken, getUserName, setUserName } from '../../utils/cookie';
import { waiting } from '../../utils';

export default {
  state: {
    token: getToken(),
    roles: [],
    userId: null,
    userName: '管理员',
    umAccount: ''
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    REMOVE_TOKEN(state) {
      state.token = null;
    },
    SET_ROLES(state, roles) {
      state.roles = roles;
    },
    REMOVE_ROLES(state) {
      state.roles = [];
    },
    SET_USER_ID(state, userId) {
      state.userId = userId;
    },
    SET_USER_NAME(state, userName) {
      state.userName = userName;
    },
    SET_UM_ACCOUNT(state, result) {
      state.umAccount = result;
    }
  },
  actions: {
    setToken({ commit }, token) {
      setToken(token);
      commit('SET_TOKEN', token);
    },
    goLogin({ commit }, userInfo) {
      return ComAPI.goLogin.request(userInfo)
        .then(res => {
          console.log('====== 用户信息 ======：', res);
          // 登陆成功后将token存储在cookie中
          setToken(res.token);
          setUserName(userInfo.username);
          commit('SET_TOKEN', res.token);
          return res;
        }).catch(error => Promise.reject(error));
    },
    async goLogout({ commit }) {
      const yes = await waiting(1000);

      removeToken();
      commit('REMOVE_TOKEN');
      commit('REMOVE_ROLES');
      return yes;
    },
    async getUserInfo({ commit }) {
      const username = getUserName();

      try {
        const result = await ComAPI.getUserInfo.request({ username });
        const { roles, userId, userName } = result;

        commit('SET_ROLES', roles);
        commit('SET_USER_ID', userId);
        commit('SET_USER_NAME', userName);
        return result;
      } catch (error) {
        console.log('===== 获取用户信息失败 ======', error);
      }
    },
    async getUmAccount({ commit }) {
      const result = await ComAPI.getUserAccount.request();

      commit('SET_UM_ACCOUNT', result);
      return result;
    }
  }
};
