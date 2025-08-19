import axiosClient from "./axiosClient";

// Lấy thông tin user đang đăng nhập
export const getCurrentUser = async () => {
  const response = await axiosClient.get("/api/users/me");
  return response.data;
};
