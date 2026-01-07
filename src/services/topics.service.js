import api from "./codingcloud";

export const getTopics = async () => {
  const res = await api.get("/topics/");
  return res.data.data || res.data || [];
};

export const createTopic = async (data) => api.post("/topics/", data);

export const updateTopic = async (id, data) =>
  api.patch(`/topics/${id}/`, data);

export const deleteTopic = async (id) =>
  api.delete(`/topics/${id}/`);
