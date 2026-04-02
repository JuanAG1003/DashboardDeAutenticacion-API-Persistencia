import { fetchFunction } from "./api.js";

// Crear usuario
export async function singupRequest(payload) {
    try {
        const response = await fetchFunction({
            method: "POST",
            endpoint: "signup",
            payload: payload,
            isAuth: true,
        })
        
        if(!response.ok){
            throw new Error(`Error al crear el usuario: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        throw error;
    }
}

// Login usuario
export async function loginRequest(payload) {
    try {
         const response = await fetchFunction({
            method: "POST",
            endpoint: "token?grant_type=password",
            payload: payload,
            isAuth: true,
         })

        if(!response.ok){
            throw new Error(`Error al iniciar sesion: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        throw error;
    }
}

// Refrescar token
export async function refreshTokenRequest(payload) {
    try {
        const response = await fetchFunction({
            method: "POST",
            endpoint: "token?grant_type=refresh_token",
            payload: payload,
            isAuth: true,
        })

        if(!response.ok){
            throw new Error(`Error al refrescar el token : ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        throw error;
    }
}