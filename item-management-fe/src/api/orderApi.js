import axiosClient from './axiosClient';

export const fetchOrders = () => axiosClient.get('/api/orders');
export const fetchOrderById = (id) => axiosClient.get(`/api/orders/${id}`);
export const updateOrderStatus = (id, status) => axiosClient.patch(`/api/orders/${id}`, { status });
