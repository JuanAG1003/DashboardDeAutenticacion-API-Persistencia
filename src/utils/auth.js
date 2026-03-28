

import { singupRequest, refreshTokenRequest, loginRequest } from "../services/api.js";

export function saveToken(token, refresh_token, user_id = false) {
  localStorage.setItem("token", token);
  localStorage.setItem("refresh_token", refresh_token);
  if(user_id) localStorage.setItem("user_id", user_id);
}


export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user_id");
}

export function isAuthenticated() {
  return !!getToken();
}

export async function singup(payload) {
  try {
    const data = await singupRequest(payload);
    saveToken(data.access_token, data.refresh_token, data.user.id);
    
  } catch (error) {
    throw error
  }
}

export async function login(payload) {
  try {
    const data = await loginRequest(payload)
    saveToken(data.access_token, data.refresh_token, data.user.id);
    
  } catch (error) {
    throw error
  }
}

export async function refreshToken() {
  try {
    const data = await refreshTokenRequest({refresh_token: getrefreshToken()});
    saveToken(data.access_token, data.refresh_token);
    
  } catch (error) {
    throw error
  }
}

export function getToken() {
  return localStorage.getItem("token");
}

export function getUserId() {
  return localStorage.getItem("user_id");
}

export function getrefreshToken() {
  return localStorage.getItem("refresh_token");
}
