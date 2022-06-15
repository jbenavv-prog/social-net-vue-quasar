import ApiService from "../../common/apiService";
import { LOGIN } from "./actions.type";

const actions = {
  [LOGIN](context, credentials) {
    return new Promise((resolve) => {
      ApiService.post("auth/authenticate", credentials)
        .then(({ data }) => {
          if (data.ok) {
            resolve(data);
          } else {
            console.log("into false error");
          }
        })
        .catch((response) => {
          console.log("Fallo del sistema");
        });
    });
  },
};

export default {
  actions,
};
