import { fetchFunction } from "./api.js";

const profilesEndpoint = "profiles"

// Obtener todos los perfiles
export async function getProfilesRequest(token, search = null) {
    let endpoint = `${profilesEndpoint}?select=*`

    if(!!search) endpoint += `&full_name=ilike.*${search}*`

    try {
        let response = await fetchFunction({
            method: "GET",
            endpoint: endpoint,
            token: token,
        })

        if(!response.ok) {
            if(response.status === 401) {
                throw new Error(`Token expirado: ${response.status}`)     

            } else {
                throw new Error(`Error fetching profiles: ${response.status}`);
            }
        }
        
        return await response.json();

    } catch (error) {
        throw error;
    }
}

// Crear perfil
export async function createProfileRequest(payload, token) {
    try {
        const response = await fetchFunction({
            method: "POST",
            endpoint: profilesEndpoint,
            token: token,
            payload: payload,
        })
        
        if(!response.ok){
            throw new Error(`Error al crear el perfil: ${response.status}`);
        }

        // return await response.json();

    } catch (error) {
        throw error;
    }
}

// Actualizar perfil
export async function updateProfileRequest(payload, token, userId) {
    try {
        const response = await fetchFunction({
            method: "PATCH",
            endpoint: `${profilesEndpoint}?user_id=eq.${userId}`,
            payload: payload,
            token: token,
        })

        if(!response.ok){
            throw new Error(`Error al actualizar el perfil: ${response.status}`);
        }

    } catch (error) {
        throw error;
    }
    
}