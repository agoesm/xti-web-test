import axiosInstance from "./axiosInstance";

export const loginUser = async (email: string, password: string) => {
  const response = await axiosInstance.post("/login", { email, password });
  const token = response.data.token;
  if (token) {
    localStorage.setItem("tokens", token);
  }
  return token;
};

export const logoutUser = async () => {
  localStorage.removeItem("token");
};

export const fetchUsers = async () => {
  const response = await axiosInstance.get("/users?page=1&per_page=12");
  return response.data.data;
};

export const fetchUsersById = async (id: number) => {
  const response = await axiosInstance.get(`/users/${id}`);
  return response.data.data;
};
