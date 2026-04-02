

import { signupTemplate} from "../templates/sessionTemplates.js";
import { alertForm, listenerPassword, cleanAlert } from "../services/alerts.js";
import { validePassword, valideUseEmail } from "../utils/validators.js";
import { singup } from "../logic/session.js";
import { updateProfile } from "../logic/profileLogic.js";
import { navigate, app } from "../main.js";

const handleSignupSubmit = async (e, form) => {
    e.preventDefault();
    const objectData = Object.fromEntries([...new FormData(form)]);
    
    if (!valideUseEmail(objectData.email)) {
        alertForm({ errorMessage: "Ingresa un correo valido", locate: "Email"});
        return;
    }
    
    cleanAlert("Email");
    const valide = validePassword(objectData.password);
              
    if(!valide.isValid) {
        alertForm({ checks: valide.checks, locate: "Password"});
        listenerPassword();
        return;
    }
    cleanAlert("Password");
    
    const payload = { full_name: objectData.fullName }
    delete objectData.fullName;
        
    try {
        await singup(objectData);
        await updateProfile(payload);
        navigate("dashboard");

    } catch (error) {
        console.error("Se ha producido un error: ", error.message);
    }
}

export function signupView() {
    return {
        render: signupTemplate(),

        events: () => {
            const form = document.querySelector("form");
                
            // crear cuenta
            form.addEventListener("submit", (e) => handleSignupSubmit(e, form))

            //  cambiar a la ventana iniciar sesion
            const gotoLogin = document.querySelector("#goto-login");

            gotoLogin.addEventListener("click", () => {
                app.classList.remove("move");
                app.classList.add("moveReverse");
                navigate("login");
            })
        }
    }
}