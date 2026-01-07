import api from "./codingcloud";

export const getModules = async () => {
  const res = await api.get("/modules/");
  return res.data.data || res.data || [];
};

export const createModule = async (data) => {
  return await api.post("/modules/", data);
};

export const updateModule = async (id, data) => {
  return await api.patch(`/modules/${id}/`, data);
};

export const deleteModule = async (id) => {
  return await api.delete(`/modules/${id}/`);
};
