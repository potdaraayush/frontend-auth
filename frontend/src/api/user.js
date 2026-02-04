import api from "./axios";

export const getUser = async () => {
  const response = await api.get("/users/me");
  return response.data;
};

export const updateUser = async (updates) => {
  const response = await api.put("/users/me", updates);
  return response.data.data;
};
