const ADD_NAV = 'ADD_NAV';
const DEL_NAV = 'DEL_NAV';

const navList = {
  state: {
    navLists: []
  },
  mutations: {
    [ADD_NAV](state, nav) {
      state.navLists = [...state.navLists, nav];
    },
    [DEL_NAV](state, index) {
      state.navLists.splice(index, 1);
    }
  },
  actions: {
    addNav({ commit }, nav) {
      commit(ADD_NAV, nav);
    },
    delNav({ commit }, index) {
      commit(DEL_NAV, index);
    }
  }
};

export default navList;
