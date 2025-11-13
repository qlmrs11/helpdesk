// src/modules/auth/auth.controller.js
const authService = require("./auth.service");
const { sendResponse } = require("../../utils/response");

exports.register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    sendResponse(res, 201, "Registrasi berhasil", result);
  } catch (err) {
    sendResponse(res, 400, err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    sendResponse(res, 200, "Login berhasil", result.data);
  } catch (err) {
    sendResponse(res, 400, err.message);
  }
};

exports.getProfile = async (req, res) => {
  try {
    const result = await authService.getProfile(req.headers.authorization);
    sendResponse(res, 200, "Profil pengguna", result.data);
  } catch (err) {
    sendResponse(res, 401, err.message);
  }
};
