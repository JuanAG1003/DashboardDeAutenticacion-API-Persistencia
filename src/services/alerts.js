
import { validePassword } from "../utils/validators.js";

export function alertForm({locate, errorMessage = null, checks = null}) {
    const container = document.querySelector(`#container${locate}`);
    const input = document.querySelector(`#input${locate}`);
    let animationNone = null;
    let alert = null;

    if(!!container.children[1]) {
        container.children[1].remove();
        if(checks) animationNone = "animation-none";

    } else {
        input.classList.add("error");
    }

    if(checks) {
        alert = `
        <div class="input__email-alert ${animationNone}">
            <ul>
                <li class="${checks.length ? "check" : ""}">Tener al menos 8 caracteres.</li>
                <li class="${checks.hasUpper ? "check" : ""}">Tener al menos una letra mayúscula.</li>
                <li class="${checks.hasLower ? "check" : ""}">Tener al menos una letra minúscula.</li>
                <li class="${checks.hasNumber ? "check" : ""}">Tener al menos un número.</li>
                <li class="${checks.hasSymbol ? "check" : ""}">Tener al menos un carácter especial.</li>
            </ul>
        </div>`;

    } else {
        alert = `
        <div class="input__email-alert">
            <label>${errorMessage}</label>
        </div>`;
    }
    
    container.insertAdjacentHTML("beforeend", alert);
} 

export function cleanAlert(locate) {
    const container = document.querySelector(`#container${locate}`);
    const input = document.querySelector(`#input${locate}`);

    if(!!container.children[1]) container.children[1].remove();
    if(!!input) input.classList.remove("error");
}

export function listenerPassword() {
    const container = document.querySelector("#containerPassword")

    container.addEventListener("input", (e) => {
        const valide = validePassword(e.target.value)
        alertForm({checks: valide.checks, locate: "Password"});
    })
}