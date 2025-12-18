// src/api/auth.api.ts
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/auth",
});

export const loginApi = async (email: string, password: string) => {
  return await API.post("/login", { email, password });
};

export const registerApi = async (payload: any) => {
  return await API.post("/register", payload);
};
