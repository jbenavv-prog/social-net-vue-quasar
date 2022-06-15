import ApiService from "../../common/api.service";
import JwtService from "../../common/jwt.service";
import { LOGIN, REGISTER } from "./actions.type";
import { SET_AUTH, SET_ERROR, CLEAN_ERROR } from "./mutations.type";

const state = {
  errors: null,
  user: {},
  isAuthenticated: !!JwtService.getToken(),
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
};

export default {
  state,
  actions,
  mutations,
};
