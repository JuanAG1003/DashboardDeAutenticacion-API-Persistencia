import { getUserId, refreshToken } from "../utils/auth.js";

const BASE_URL = "https://vbuudihesvvnhowrxiex.supabase.co/rest/v1";

// Obtener todos los perfiles
export async function getProfiles(token, search = false) {
    let urlFiltro = `${BASE_URL}/profiles?select=*`

    if(!!search) urlFiltro += `&full_name=ilike.*${search}*`

    try {
        let response = await fetch(urlFiltro, {
            headers: {
                "apikey": "sb_publishable_07OlN-KbT7teGIZCRtHQOA_Z8d2Jhcb",
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if(!response.ok) {
            if(response.status === 401) {
                await refreshToken()
                response = await getProfiles()     

            } else {
                throw new Error(`Error fetching profiles: ${response.status}`);
            }
        }
        
        return await response.json();

    } catch (error) {
        console.error("Se ha producido un error: ", error.message);
        throw error;
    }
}

// Crear perfil
export async function createProfile(payload, token) {
    try {
        const response = await fetch(`${BASE_URL}/profiles`, {
            method: "POST",
            headers: {
                "apikey": "sb_publishable_07OlN-KbT7teGIZCRtHQOA_Z8d2Jhcb",
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if(!response.ok){
            throw new Error(`Error al crear el perfil: ${response.status}`);
        }

        // return await response.json();

    } catch (error) {
        console.error("Se ha producido un error: ", error.message);
        throw error;
    }
}

// Actualizar perfil
export async function updateProfile(payload, token) {
    try {
        const response = await fetch(`${BASE_URL}/profiles?user_id=eq.${getUserId()}`, {
            method: "PATCH",
            headers: {
                "apikey": "sb_publishable_07OlN-KbT7teGIZCRtHQOA_Z8d2Jhcb",
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if(!response.ok){
            throw new Error(`Error al actualizar el perfil: ${response.status}`);
        }

    } catch (error) {
        console.error("Se ha producido un error: ", error.message);
        throw error;
    }
    
}

//?---------------Auth Service-------------------------

const BASE_URL_AUTH = "https://vbuudihesvvnhowrxiex.supabase.co/auth/v1";

// Crear usuario
export async function singupRequest(payload) {
    try {
        const response = await fetch(`${BASE_URL_AUTH}/signup`, {
            method: "POST",
            headers: {
                "apikey": "sb_publishable_07OlN-KbT7teGIZCRtHQOA_Z8d2Jhcb",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if(!response.ok){
            if(response.status === 422) {
                throw new Error(`El usuario ya existe`)
            } else {
                throw new Error(`Error al crear el usuario: ${response.status}`);
            }
        }

        return await response.json();

    } catch (error) {
        console.error("Se ha producido un error: ", error.message); 
        throw error;
    }
}

// Login usuario
export async function loginRequest(payload) {
    try {
         const response = await fetch(`${BASE_URL_AUTH}/token?grant_type=password`, {
            method: "POST",
            headers: {
                "apikey": "sb_publishable_07OlN-KbT7teGIZCRtHQOA_Z8d2Jhcb",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if(!response.ok){
            throw new Error(`Error al iniciar sesion: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error("Se ha producido un error: ", error.message);
        throw error;
    }
}

// Refrescar token
export async function refreshTokenRequest(payload) {
    try {
        const response = await fetch(`${BASE_URL_AUTH}/token?grant_type=refresh_token`, {
            method: "POST",
            headers: {
                "apikey": "sb_publishable_07OlN-KbT7teGIZCRtHQOA_Z8d2Jhcb",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if(!response.ok){
            throw new Error(`Error al refrescar el token : ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error("Se ha producido un error: ", error.message);
        throw error;
    }
}