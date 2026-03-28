

import { navigate, app } from "../main.js";
import { updateProfile } from "../services/api.js";
import { getToken, singup, login } from "../utils/auth.js";
import { alertForm, alertPassword } from "../services/alerts.js";

// objeto con el render y funciones del login y signup

export let logViews = {
    login: {
        render: `
        <div class="login__container">
            <h1>¡Binevenido de vuelta!</h1>
            <p>Por favor ingresa tus datos</p>
            <form class="login__form">
                <div class="form__input-container" id="container-email">
                    <input placeholder="E-mail" type="email"  id="inputEmail" name="email">
                </div>
                <div class="form__input-container" id="container-password">
                    <input placeholder="password" type="password" id="inputPassword" name="password">
                </div>
                <input type="submit" value="Iniciar sesión">
            </form>
            <label>¿No tienes cuenta? <span id="goto-signup">Regístrate</span></label>
        </div>`,

        events: () => {
            const form = document.querySelector("form")
            const containerAlertEmail = document.querySelector("#container-email")
            const containerAlertPassword = document.querySelector("#container-password")


            // Iniciar sesion
            form.addEventListener("submit", async (e) => {
                e.preventDefault()
                const objectData = Object.fromEntries([...new FormData(form)])

                if (!valideUseEmail(objectData.email)) {
                    alertForm("Ingresa un correo valido", containerAlertEmail)
                    return
                }

                if(!!containerAlertEmail.children[1]) containerAlertEmail.children[1].remove();

                try {
                    await login(objectData)
                    navigate("dashboard")

                } catch (error) {
                    containerAlertEmail.children[0].classList.add("error")
                    alertForm("Email o contraseña invalido", containerAlertPassword)
                    console.warn("Login detenido");
                }
            })

            // cambiar a la ventana crear cuenta
            const gotoSingup = document.querySelector("#goto-signup")

            gotoSingup.addEventListener("click", () => {        
                app.classList.remove("moveReverse")
                app.classList.add("move")
                navigate("signup")

            })
        
        }
    },

    signup: {
        render: `
        <div class="login__container">
            <h1>Crea una cuenta</h1>
            <form class="login__form">
                <div class="form__input-container" id="container-name">
                    <input placeholder="Full Name" type="text" id="inputName" name="fullName">
                </div>
                <div class="form__input-container" id="container-email">
                    <input placeholder="E-mail" type="email"  id="inputEmail" name="email">
                </div>
                <div class="form__input-container" id="container-password">
                    <input placeholder="password" type="password" id="inputPassword" name="password">
                </div>
                <input type="submit" value="Crear cuenta">
            </form>
            <label>¿Ya tienes una cuenta? <span id="goto-login">Inicia sesión</span></label>
        </div>`,

        events: () => {
            const form = document.querySelector("form")
            const containerAlertEmail = document.querySelector("#container-email")
            const containerAlertPassword = document.querySelector("#container-password")
    
            // crear cuenta
            form.addEventListener("submit", async (e) => {
                e.preventDefault()
            
                const objectData = Object.fromEntries([...new FormData(form)])
            
                if (!valideUseEmail(objectData.email)) {
                    alertForm("Ingresa un correo valido", containerAlertEmail)
                    return
                }
            
                containerAlertEmail.children[0].classList.remove("error")
                if(!!containerAlertEmail.children[1]) containerAlertEmail.children[1].remove();
                      
                if(!validePassword(objectData.password).isValid) {
                    alertPassword(validePassword(objectData.password).checks, containerAlertPassword)
                    listenerPassword(containerAlertPassword)
                    return
                }
            
                let payload = { full_name: objectData.fullName }
                delete objectData.fullName
            
                
                try {
                    await singup(objectData)
                    await updateProfile(payload, getToken())
                    navigate("dashboard") 

                } catch (error) {
                    containerAlertEmail.children[0].classList.add("error")
                    containerAlertPassword.children[0].classList.remove("error")
                    if(!!containerAlertPassword.children[1]) containerAlertPassword.children[1].remove();

                    if(error.message === "El usuario ya existe") {
                        alertForm(error.message, containerAlertEmail)
                    } else {
                        alertForm(error.message, containerAlertPassword)
                    }
                }
            
            })

            //  cambiar a la ventana iniciar sesion
            const gotoLogin = document.querySelector("#goto-login")

            gotoLogin.addEventListener("click", () => {
                app.classList.remove("move")
                app.classList.add("moveReverse") 
                navigate("login")
            
            })
        }
    }
} 
// Regex

const valideUseEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailRegex.test(email);
}

const validePassword = (password) => {
    const checks = {
        length:    /.{8,}/.test(password),  // al menos 8 carácteres
        hasUpper:  /[A-Z]/.test(password),  // al menos una mayúscula
        hasLower:  /[a-z]/.test(password),  // al menos una minúscula
        hasNumber: /\d/.test(password),     // al menos un número
        hasSymbol: /[\W_]/.test(password)   // al menos un carácter especia
    };

    let isValid = true

    Object.values(checks).map(element => {
        isValid *= element
    }) 

    return {checks: checks, isValid: isValid }
}

const listenerPassword = (container) => {
    container.addEventListener("input", (e) => {
        alertPassword(validePassword(e.target.value).checks, container)
        
    })
}