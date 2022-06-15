import axios from "axios";
import { API_URL } from "./config";

const ApiService = {
  post(resource, params) {
    return axios.post(`${API_URL}${resource}`, params);
  },
};

export default ApiService;
