import axios from "axios";
import qs from "qs";

export const Strapi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_STRAPI_URL}/api`,
  paramsSerializer: (params) => qs.stringify(params),
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_READ_TOKEN}`,
  },
});
