import ComAPI from '@/api/common';
import { getToken, setToken, removeToken, getUserName, setUserName } from '../../utils/cookie';
import { waiting } from '../../utils';

export default {
  state: {
    token: getToken(),
    roles: [],
    userId: null,
    userName: '管理员',
    umAccount: 'test002'
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
      return $http.post(ComAPI.goLogin, userInfo)
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
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        const username = getUserName();

        $http.post(ComAPI.getUserInfo, { username }).then(result => {

          const { roles, userId, userName } = result;

          commit('SET_ROLES', roles);
          commit('SET_USER_ID', userId);
          commit('SET_USER_NAME', userName);
          resolve(result);
        }).catch(error => {
          reject(error);
        });
      });
    },
    getUmAccount({ commit }) {
      return new Promise((resolve, reject) => {
        $http.post(ComAPI.getUserAccount).then(result => {
          commit('SET_UM_ACCOUNT', result.result);
          resolve(result);
        }).catch(error => {
          reject(error);
        });
      });
    }
  }
};
