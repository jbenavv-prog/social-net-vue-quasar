import ApiService from "app/common/api.service";
import {
  FETCH_PROFILE,
  FETCH_OWN_PROFILE,
  FETCH_PUBLICATIONS,
} from "./actions.type";
import { SET_PROFILE, SET_OWN_PROFILE, SET_ERROR } from "./mutations.type";

const state = {
  errors: {},
  profile: {},
  ownProfile: {},
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
          context.commit(SET_ERROR, response.message);
        }
      })
      .catch((error) => {
        // context.commit(SET_ERROR, error);
      });
  },

  [FETCH_OWN_PROFILE](context) {
    ApiService.setHeader();
    return ApiService.post("profiles/getOwnProfile", {})
      .then(({ data: response }) => {
        if (response.ok) {
          context.commit(SET_OWN_PROFILE, response.data);
        } else {
          context.commit(SET_ERROR, response.message);
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
  [SET_OWN_PROFILE](state, profile) {
    state.ownProfile = profile;
    state.errors = {};
  },
  [SET_ERROR](state, error) {
    state.errors = error;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
