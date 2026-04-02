
import { getProfilesRequest, createProfileRequest, updateProfileRequest } from "../services/profileService.js";
import { getToken, getUserId } from "../utils/storage.js";
import { refreshToken } from "./session.js";


export function isAuthenticated() {
  return !!getToken();
}

export async function getProfiles(search = null) {
    let token = getToken();

    try {
        return await getProfilesRequest(token, search);
        
    } catch (error) {
        if(error.message.includes("401")) {
            token = await refreshToken();

            return await getProfilesRequest(token, search);
        }

        throw error;
    }
}

export async function createProfile(payload) {
    const token = getToken();

    try {
        await createProfileRequest(payload,token);
        
    } catch (error) {
        
    }
}

export async function updateProfile(payload) {
    const token = getToken();
    const userId = getUserId();

    try {
        await updateProfileRequest(payload, token, userId);

    } catch (error) {
        
    }
}