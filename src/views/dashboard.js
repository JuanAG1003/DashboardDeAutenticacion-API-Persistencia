import { getUserId, logout, getToken } from "../utils/auth.js"
import { getProfiles } from "../services/api.js"
import { navigate } from "../main.js"

export const dashboardViews = {
    dashboard: {
        render: `
        <header class="header">
            <nav class="header__navbar">
                <div  class="header__navbar-logo">
                    <img src="src/media/jagar_logo-small.png" alt="JAGAR Logo">  
                </div>
                <div class="header__navbar-btns-container">
                    <div>
                        <span class="material-symbols-outlined">location_away</span>
                        <input type="text" placeholder="Search" name="" id="search">
                    </div>
                    <button>
                        <span class="material-symbols-outlined">mode_night</span>
                    </button>
                    <button id="logout">
                        <span class="material-symbols-outlined">logout</span>
                    </button>
                </div>              
            </nav>
        </header>
        <section class="wrapper">
            <nav class="wrapper__navbar">
                <div class="wrapper__navbar-btn-container">
                    <button>
                    <span class="material-symbols-outlined">home</span>Home
                </button>
                <button>
                    <span class="material-symbols-outlined">logout</span>
                </button>
                </div>
                    <button>
                    <span class="material-symbols-outlined">account_circle</span>Perfil
                </button>
            </nav>
            <main class="wrapper__main" id="main"></main>
        </section>`,
        
        events: async () => {
            // Graficar las cards de los perfiles
            await renderCard(getProfiles(getToken()))
            
            //Cerrar sesion
            const btnLogout = document.querySelector("#logout")
            
            btnLogout.addEventListener("click", () => {
                logout()
                navigate("login")
            })
            
            // Buscador
            const search = document.querySelector("#search")
            let timerId = ""
            
            search.addEventListener("input", (e) => {
                const container = document.querySelector("#main")
                
                clearTimeout(timerId)
                
                timerId = setTimeout( async () => {
                    container.innerHTML = ""
                    await renderCard(getProfiles(getToken(), e.target.value))
                    
                }, 1000);
            })
        }
    }
}

async function renderCard(promiseProfiles) {
    const container = document.querySelector("#main")
    const profilesArray = await promiseProfiles
    
    profilesArray.map((profile) => {
        if(!profile.job_title) profile.job_title = ""
        const profileCard = `
        <div class="wrapper__main-card">
            <h3>Nombre:</h3>
            <p>${profile.full_name}</p>
            <h3>Oficio:</h3>
            <p>${profile.job_title} </p>
            <h3>E-mail:</h3>
            <p>${profile.email} </p>
        </div>`

        if(profile.user_id === getUserId()) {
            container.insertAdjacentHTML("afterbegin", profileCard)

        } else {
            container.insertAdjacentHTML("beforeend", profileCard)
        }
    })
}
