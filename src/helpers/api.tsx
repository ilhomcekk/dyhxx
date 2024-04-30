import i18n from "../../i18n";
import { API_URL, token } from "../config/index";

import axios from "axios";

export const $api = axios.create({
  baseURL: API_URL,
});

$api.defaults.headers.common["Accept"] = "application/json";

export const initApp = () => {
  $api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
  $api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

// Language
$api.interceptors.request.use((config) => {
  config.headers["Accept-Language"] = i18n.language.toLowerCase();
  return config;
});

export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
  $api.defaults.headers.common["Accept-Language"] = lng;
};
