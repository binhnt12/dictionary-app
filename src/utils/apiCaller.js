import axios from "axios";
// import { API_URL } from "../constants/api";
const API_URL = process.env.API_URL || "http://192.168.5.110:5000";

export default function callApi(method, endpoint, data, token) {
  if (token) {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  }
  return axios({
    method,
    url: `${API_URL}/${endpoint}`,
    data,
  }).catch(error => {
    if (error.response) {
      return Promise.reject(error);
    }
    console.log(error);
  });
}
