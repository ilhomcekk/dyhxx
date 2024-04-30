import { API_URL } from "../config";
import { $api } from "./api";

export const requests = {
  fetch: () => $api.get(`${API_URL}`),
};
