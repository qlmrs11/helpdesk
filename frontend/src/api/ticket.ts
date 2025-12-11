import { api } from "../utils/request";

export const createTicket = (payload) => api.post("/ticket", payload);
export const getTickets = () => api.get("/ticket");
export const getTicket = (id) => api.get(`/ticket/${id}`);
export const assignTicket = (id) => api.patch(`/ticket/${id}/assign`);
export const updateStatus = (id, status) => api.patch(`/ticket/${id}/status`, { status });
export const confirmTicket = (id) => api.patch(`/ticket/${id}/confirm`);
