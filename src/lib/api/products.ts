import api from "./axios";

export const getAllProducts = async () => {
  const res = await api.get("/api/products");
  return res.data;
};

export const getProductById = async (id: number | string) => {
  const res = await api.get(`/api/products/${id}`);
  return res.data;
};
