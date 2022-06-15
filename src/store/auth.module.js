import { LOGIN } from "./actions.type";

const actions = {
  [LOGIN](context, credentials) {
    console.log(context);
    console.log(credentials);
    return "login action";
  },
};

export default {
  actions,
};
