

import { loginTemplate } from "../templates/sessionTemplates.js";
import { navigate, app } from "../main.js";
import { login } from "../logic/session.js";
import { alertForm, cleanAlert } from "../services/alerts.js";
import { valideUseEmail } from "../utils/validators.js";

const handleLoginSubmit = async (e, form) => {
    e.preventDefault();
    const objectData = Object.fromEntries([...new FormData(form)]);

    if (!valideUseEmail(objectData.email)) {
        alertForm({ errorMessage: "Ingresa un correo valido", locate: "Email"});
        return;
    }

    cleanAlert("Email");

    try {
        await login(objectData);
        navigate("dashboard");

    } catch (error) {
        console.error("Se ha producido un error: ", error.message);
    }
}

export function logingView() {
    return {
        render: loginTemplate(),

        events: () => {
            const form = document.querySelector("form");

            // Iniciar sesion
            form.addEventListener("submit", async (e) => handleLoginSubmit(e, form))

            // cambiar a la ventana crear cuenta
            const gotoSingup = document.querySelector("#goto-signup");

            gotoSingup.addEventListener("click", () => {        
                app.classList.remove("moveReverse");
                app.classList.add("move");
                navigate("signup");
            })
        }
    }
} 