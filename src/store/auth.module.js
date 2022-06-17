import ApiService from "../../common/api.service";
import JwtService from "../../common/jwt.service";
import { LOGIN, LOGOUT, REGISTER, CHECK_AUTH } from "./actions.type";
import { SET_AUTH, SET_ERROR, CLEAN_ERROR, PURGE_AUTH } from "./mutations.type";

const state = {
  errors: null,
  user: {},
  isAuthenticated: !!JwtService.getToken(),
};

const getters = {
  currentUser(state) {
    console.log(state);
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
};

const actions = {
  [LOGIN](context, credentials) {
    return new Promise((resolve) => {
      ApiService.post("auth/authenticate", credentials)
        .then(({ data: response }) => {
          if (response.ok) {
            context.commit(SET_AUTH, response.data);
            resolve(response);
          } else {
            context.commit(SET_ERROR, response.message);
          }
        })
        .catch((response) => {
          context.commit(SET_ERROR, "Fallo del sistema");
        });
    });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  },
  [REGISTER](context, credentials) {
    return new Promise((resolve) => {
      ApiService.post("auth/register", credentials)
        .then(({ data: response }) => {
          if (response.ok) {
            resolve(response);
          } else {
            context.commit(SET_ERROR, response.message);
          }
        })
        .catch((response) => {
          context.commit(SET_ERROR, "Fallo del sistema");
        });
    });
  },
  [CHECK_AUTH](context) {
    return new Promise((resolve, reject) => {
      if (JwtService.getToken()) {
        ApiService.setHeader();
        ApiService.post("auth/user", {})
          .then(({ data: response }) => {
            if (response.ok) {
              resolve(response.data);
              context.commit(SET_AUTH, response.data);
            } else {
              context.commit(SET_ERROR, response.message);
            }
          })
          .catch((error) => {
            // console.log("Fallo del sistema: ", error);
            context.commit(SET_ERROR, "Fallo del sistema");
            reject(error);
          });
      } else {
        context.commit(PURGE_AUTH);
      }
    });
  },
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [CLEAN_ERROR]() {
    state.errors = {};
  },
  [SET_AUTH](state, user) {
    state.isAuthenticated = true;
    state.user = user;
    state.errors = {};
    JwtService.saveToken(state.user.token);
  },

  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyToken();
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
