import axios from "axios";
import qs from "qs";

export const Api = axios.create({
  baseURL: "/api",
  paramsSerializer: (params) => qs.stringify(params),
});