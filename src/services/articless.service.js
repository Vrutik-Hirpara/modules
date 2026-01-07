import api from "./codingcloud";

export const getArticles = async () => {
  const res = await api.get("/articles/");
  return res.data.data || res.data || [];
};

export const createArticle = async (data) => {
  return await api.post("/articles/", data, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

export const updateArticle = async (id, data) => {
  return await api.patch(`/articles/${id}/`, data, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

export const deleteArticle = async (id) => {
  return await api.delete(`/articles/${id}/`);
};
