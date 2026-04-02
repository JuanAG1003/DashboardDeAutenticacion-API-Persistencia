

import { singupRequest, loginRequest, refreshTokenRequest } from "../services/sessionService.js";
import { saveToken, getRefreshToken, removeToken } from "../utils/storage.js";
import { alertForm } from "../services/alerts.js";

export async function singup(payload) {
  try {
    const data = await singupRequest(payload);
    saveToken(data.access_token, data.refresh_token, data.user.id);
    
  } catch (error) {
    if(error.message.includes("422")) {
      alertForm({errorMessage: "El usuario ya existe", locate: "Email" });
      throw new Error("El usuario ya existe");
    }

    alertForm({errorMessage: error, locate: "Password"});
    throw error;
  }
}

export async function login(payload) {
  try {
    const data = await loginRequest(payload)
    saveToken(data.access_token, data.refresh_token, data.user.id);
    
  } catch (error) {
    document.querySelector("#inputEmail").classList.add("error");
    alertForm({ errorMessage: "Email o contraseña invalido", locate: "Password"})
    throw error
  }
}

export async function refreshToken() {
    const refreshToken = { refresh_token: getRefreshToken()}

  try {
    const data = await refreshTokenRequest(refreshToken);
    saveToken(data.access_token, data.refresh_token);

    return data.access_token;
    
  } catch (error) {
    throw error
  }
}

export function logout() {
  removeToken();
    
}