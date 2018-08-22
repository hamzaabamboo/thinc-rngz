import { LOGIN, LOGOUT, ERROR } from './actions.type';
import { SET_AUTH, PURGE_AUTH } from './mutations.type';
import UserStorage from '@/common/storage/user.storage';
import { auth, provider } from '@/common/firebase';

const state = {
  user: UserStorage.get
};

const getters = {
  currentUser(state: any) {
    return state.user && state.user.displayName;
  },
  isAuthenticated(state: any) {
    return !!state.user;
  }
};

const actions = {
  [LOGIN](context) {
    auth()
      .signInWithPopup(provider)
      .then(({ user }) => {
        console.log(user);
        context.commit(SET_AUTH, user);
      });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  }
};

const mutations = {
  [SET_AUTH](state, data) {
    state.user = data;
    UserStorage.save(data);
  },
  [PURGE_AUTH](state) {
    state.user = null;
    UserStorage.destroy();
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
