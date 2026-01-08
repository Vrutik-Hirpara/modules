import axios from "axios";

const API = "https://codingcloud.pythonanywhere.com";

export const getFAQs = async () => {
  const res = await axios.get(`${API}/faqs/`);
  return res.data.data || [];
};

export const getTestimonials = async () => {
  const res = await axios.get(`${API}/testimonials/`);
  return res.data.data || [];
};

export const getCategories = async () => {
  const res = await axios.get(`${API}/category/`);
  return res.data.data || [];
};

export const getCourses = async () => {
  const res = await axios.get(`${API}/course/`);
  return res.data.data || [];
};

export const getArticles = async () => {
  const res = await axios.get(`${API}/articles/`);
  return res.data.data || [];
};

export const getModules = async () => {
  const res = await axios.get(`${API}/modules/`);
  return res.data.data || [];
};

export const getTopics = async () => {
  const res = await axios.get(`${API}/topics/`);
  return res.data.data || [];
};
