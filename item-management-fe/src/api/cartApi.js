import axiosClient from "./axiosClient";

export const fetchCart = async () => {
  const response = await axiosClient.get("/api/cart");
  return response.data;
};

export const addToCart = async (item) => {
  const response = await axiosClient.post("/api/cart/add", item);
  return response.data;
};

export const updateCartItem = async ({ productId, cartId, quantity }) => {
  const response = await axiosClient.put(`/api/cart/update`, {
    productId,
    cartId,
    quantity,
  });
  return response.data;
};

export const removeFromCartApi = async (productId) => {
  const response = await axiosClient.delete(`/api/cart/remove/${productId}`);
  return response.data;
};

export const clearCartApi = async () => {
  const response = await axiosClient.delete("/api/cart");
  return response.data;
};
