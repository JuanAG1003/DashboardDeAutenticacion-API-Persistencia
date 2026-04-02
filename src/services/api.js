




const BASE_URL = "https://vbuudihesvvnhowrxiex.supabase.co";
const URL_Service = `${BASE_URL}/rest/v1`; 
const URL_Auth = `${BASE_URL}/auth/v1`;
const apikey = "sb_publishable_07OlN-KbT7teGIZCRtHQOA_Z8d2Jhcb"

export async function  fetchFunction({
    method,
    endpoint,
    payload = null,
    token = null,
    isAuth = false,
})  {
    const baseUrl = isAuth ? URL_Auth : URL_Service;

    const headers = {
        "apikey": apikey,
        "Content-Type": "application/json"
    }

    if(token) {
        headers["Authorization"] = `Bearer ${token}`
    }

    const options = {
        method,
        headers,
    }

    if(method !== "GET" && payload) {
        options.body = JSON.stringify(payload)
    }

    return await fetch(`${baseUrl}/${endpoint}`, options);
}