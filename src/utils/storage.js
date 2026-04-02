


export function saveToken(token, refresh_token, user_id = false) {
  localStorage.setItem("token", token);
  localStorage.setItem("refresh_token", refresh_token);
  if(user_id) localStorage.setItem("user_id", user_id);
}


export function removeToken() {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user_id");
}

export function getToken() {
  return localStorage.getItem("token");
}

export function getUserId() {
  return localStorage.getItem("user_id");
}

export function getRefreshToken() {
  return localStorage.getItem("refresh_token");
}
