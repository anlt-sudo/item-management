import axiosClient from "./axiosClient";

export const fetchAllProducts = () => axiosClient.get("/api/products");
export const fetchProductById = (id) => axiosClient.get(`/api/products/${id}`);
export const createProduct = (data) =>
  axiosClient.post("/api/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateProduct = (id, data) =>
  axiosClient.put(`/api/products/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteProduct = (id) => axiosClient.delete(`/api/products/${id}`);
export const searchProducts = (productName) => {
  return axiosClient.get(`/api/products/search`, {
    params: { productName },
  });
};
