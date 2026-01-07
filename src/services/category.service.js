import api from "./codingcloud";

export const getCategories = async () => {
  const res = await api.get("/category/");
  return res.data.data || res.data || [];
};

export const createCategory = async (data) => {
  return await api.post("/category/", data, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

export const updateCategory = async (id, data) => {
  return await api.patch(`/category/${id}/`, data, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

export const deleteCategory = async (id) => {
  return await api.delete(`/category/${id}/`);
};
