import { FETCH_PUBLICATIONS } from "./actions.type";
import { SET_PUBLICATIONS, SET_ERROR } from "./mutations.type";

import ApiService from "app/common/api.service";

const state = {
  errors: {},
  publications: {},
};

const getters = {};

const actions = {
  [FETCH_PUBLICATIONS](context) {
    ApiService.setHeader();
    return ApiService.post("publication/getPublications")
      .then(({ data: response }) => {
        if (response.ok) {
          console.log(response);
          context.commit(SET_PUBLICATIONS, response.data);
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
};

export default {
  state,
  getters,
  actions,
  mutations,
};
