const ADD = 'ADD_NAV';
const DEL = 'DEL_NAV';

const navs = {
  state: {
    navs: []
  },
  mutations: {
    [ADD](state, nav) {
      state.navs = [...state.navs, nav];
    },
    [DEL](state, index) {
      state.navs.splice(index, 1);
    }
  },
  actions: {
    addNav({ commit }, nav) {
      commit(ADD, nav);
    },
    delNav({ commit }, index) {
      commit(DEL, index);
    }
  }
};

export default navs;
