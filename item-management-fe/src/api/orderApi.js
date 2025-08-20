import axiosClient from "./axiosClient";

export const fetchOrders = () => axiosClient.get("/api/orders/my");
export const fetchOrderById = (id) => axiosClient.get(`/api/orders/${id}`);
export const updateOrderStatus = (id, status) =>
  axiosClient.patch(`/api/orders/${id}`, { status });
export const placeOrder = (data) => axiosClient.post("/api/orders/place", data);
