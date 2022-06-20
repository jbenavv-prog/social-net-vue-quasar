import {
  FETCH_PUBLICATIONS,
  FETCH_PROFILE_PUBLICATIONS,
  CREATE_REACTION,
  CREATE_COMMENT,
  CREATE_PUBLICATION,
} from "./actions.type";
import {
  SET_PUBLICATIONS,
  SET_PROFILE_PUBLICATIONS,
  SET_ERROR,
} from "./mutations.type";

import ApiService from "app/common/api.service";

const state = {
  errors: {},
  publications: {},
  profilePublications: {},
};

const getters = {};

const actions = {
  [FETCH_PUBLICATIONS](context) {
    ApiService.setHeader();
    return ApiService.post("publication/getPublications", {})
      .then(({ data: response }) => {
        if (response.ok) {
          console.log(response.data.result);
          context.commit(SET_PUBLICATIONS, response.data.result);
        } else {
          console.log(response.message);
          context.commit(SET_ERROR, response.message);
        }
      })
      .catch(() => {
        console.log("Fallo del sistema");
        context.commit(SET_ERROR, "Fallo del sistema");
      });
  },

  [FETCH_PROFILE_PUBLICATIONS](context, user) {
    ApiService.setHeader();
    console.log(user);
    return ApiService.post("publication/getPublicationsByUser", user)
      .then(({ data: response }) => {
        if (response.ok) {
          console.log(response.data.result);
          context.commit(SET_PROFILE_PUBLICATIONS, response.data.result);
        } else {
          console.log(response.message);
          context.commit(SET_ERROR, response.message);
        }
      })
      .catch(() => {
        console.log("Fallo del sistema");
      });
  },

  [CREATE_REACTION](context, request) {
    ApiService.setHeader();
    return ApiService.post("publication/createReaction", request)
      .then(({ data: response }) => {
        if (response.ok) {
          console.log(response.data);
        } else {
          console.log(response.message);
          context.commit(SET_ERROR, response.message);
        }
      })
      .catch(() => {
        console.log("Fallo del sistema");
        context.commit(SET_ERROR, "Fallo del sistema");
      });
  },
  [CREATE_COMMENT](context, request) {
    ApiService.setHeader();
    return ApiService.post("publication/createComment", request)
      .then(({ data: response }) => {
        if (response.ok) {
          console.log(response.data);
        } else {
          console.log(response.message);
          context.commit(SET_ERROR, response.message);
        }
      })
      .catch(() => {
        console.log("Fallo del sistema");
        context.commit(SET_ERROR, "Fallo del sistema");
      });
  },
  [CREATE_PUBLICATION](context, formData) {
    ApiService.setHeader();
    return ApiService.post("publication/create", formData)
      .then(({ data: response }) => {
        if (response.ok) {
          console.log(response.data);
        } else {
          console.log(response.message);
          context.commit(SET_ERROR, response.message);
        }
      })
      .catch(() => {
        console.log("Fallo del sistema");
        context.commit(SET_ERROR, "Fallo del sistema");
      });
  },
};

const mutations = {
  [SET_PUBLICATIONS](state, publications) {
    state.publications = publications;
    state.errors = {};
  },
  [SET_PROFILE_PUBLICATIONS](state, profilePublications) {
    state.profilePublications = profilePublications;
    state.errors = {};
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
