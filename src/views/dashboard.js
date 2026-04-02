

import { dashboardTemplate, cardTemplate } from "../templates/profileTemplates.js"
import { getUserId } from "../utils/storage.js"
import { getProfiles } from "../logic/profileLogic.js"
import { logout } from "../logic/session.js"
import { navigate } from "../main.js"

let timerId = null;

const renderCard = (profiles, container) => {
    profiles.forEach((profile) => {
        const profileCard = cardTemplate(
            profile.full_name,
            profile.job_title || "Sin oficio",
            profile.email
        )

        const position = profile.user_id === getUserId() ? "afterbegin" : "beforeend";
        container.insertAdjacentHTML(position, profileCard);
    })
}

export function dashboardView() {
    return {
        render: dashboardTemplate(),
        
        events: async () => {
            const container = document.querySelector("#main");
            // Graficar las cards de los perfiles
            const profiles = await getProfiles()
            renderCard(profiles, container);
            
            //Cerrar sesion
            const btnLogout = document.querySelector("#logout");
            
            btnLogout.addEventListener("click", () => {
                logout();
                navigate("login");
            })
            
            // Buscador
            const search = document.querySelector("#search");
            
            search.addEventListener("input", (e) => {
                clearTimeout(timerId);
                
                timerId = setTimeout( async () => {
                    const profiles = await getProfiles(e.target.value)
                    if(!document.querySelector("#main")) return;     // Verificación de seguridad
                    container.innerHTML = "";
                    renderCard(profiles, container);
                    
                }, 1000);
            })
        },

        cleanup: () => {
            clearTimeout(timerId);
            timerId = null;
        }
    }
}