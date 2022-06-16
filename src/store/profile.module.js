import ApiService from "app/common/api.service";
import { FETCH_PROFILE } from "./actions.type";
import { SET_PROFILE } from "./mutations.type";

const state = {
  errors: {},
  profile: {},
};

const getters = {
  profile(state) {
    return state.profile;
  },
};

const actions = {
  [FETCH_PROFILE](context, payload) {
    console.log(payload);
    const { user } = payload;
    return ApiService.get("profiles/getProfile", user)
      .then(({ data: response }) => {
        if (response.ok) {
          context.commit(SET_PROFILE, response.data);
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

const mutations = {
  [SET_PROFILE](state, profile) {
    state.profile = profile;
    state.errors = {};
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
