import ApiService from "../../common/api.service";
import JwtService from "../../common/jwt.service";
import { LOGIN } from "./actions.type";
import { SET_AUTH } from "./mutations.type";

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
            console.log(response.message);
          }
        })
        .catch((response) => {
          console.log(response);
          console.log("Fallo del sistema");
        });
    });
  },
};

const mutations = {
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
