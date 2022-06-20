import ApiService from "app/common/api.service";
import {
  FETCH_PROFILE,
  FETCH_OWN_PROFILE,
  UPDATE_PHOTO_PROFILE,
  UPDATE_PROFILE_DETAILS,
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
  [FETCH_PROFILE](context, user) {
    ApiService.setHeader();
    return ApiService.post("profiles/getProfile", user)
      .then(({ data: response }) => {
        if (response.ok) {
          console.log(response.data);
          context.commit(SET_PROFILE, response.data);
        } else {
          context.commit(SET_ERROR, response.message);
        }
      })
      .catch((error) => {
        console.log(error);
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

  [UPDATE_PHOTO_PROFILE](context, formData) {
    ApiService.setHeader();
    return ApiService.post("profiles/updatePhotoProfile", formData)
      .then(({ data: response }) => {
        if (response.ok) {
          // context.commit(SET_OWN_PROFILE, response.data);
        } else {
          context.commit(SET_ERROR, response.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  [UPDATE_PROFILE_DETAILS](context, request) {
    ApiService.setHeader();
    return ApiService.post("profiles/updateDetails", request)
      .then(({ data: response }) => {
        if (response.ok) {
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
