import api from "./axios";

export const getUser = async () => {
  const response = await api.get("/users/me");
  return response.data;
};
