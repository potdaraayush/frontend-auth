import api from "./axios";

export const getTasks = async () => {
  const response = await api.get("/tasks");
  return response.data;
};


export const createTask = async (title, description = "") => {
  const response = await api.post("/tasks", { title, description });
  return response.data;
};

export const updateTask = async (id, data) => {
  const response = await api.put(`/tasks/${id}`, data);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};
