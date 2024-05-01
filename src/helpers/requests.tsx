import { API_URL } from "../config";
import { QueueParamsType } from "../types";
import { $api } from "./api";

export const requests = {
  fetchCategory: () => $api.get(`${API_URL}/category`),
  queueCreate: (params: QueueParamsType) =>
    $api.post(`${API_URL}/queue`, params),
};
