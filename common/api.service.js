import axios from "axios";
import { API_URL } from "./config";
import JwtService from "./jwt.service";

const ApiService = {
  setHeader() {
    axios.defaults.headers.common["Authorization"] = `${JwtService.getToken()}`;
  },

  post(resource, params) {
    return axios.post(`${API_URL}${resource}`, params);
  },
};

export default ApiService;
