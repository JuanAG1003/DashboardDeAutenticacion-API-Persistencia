


export function alertForm(errorMessage, container) {
    const alert = `
    <div class="input__email-alert">
        <label>${errorMessage}</label>
    </div>`;


    if(!!container.children[1]) {
        container.children[1].remove();

    } else {
        container.children[0].classList.add("error")
    }
    
    container.insertAdjacentHTML("beforeend", alert);
}

export function alertPassword(checks, container) {
    let animationNone = ""
    
    if(!!container.children[1]) {
        container.children[1].remove();
        animationNone = "animation-none"
    } else {
        container.children[0].classList.add("error")
    }

    const alert = `
    <div class="input__email-alert ${animationNone}">
        <ul>
            <li class="${checks.length ? "check" : ""}">Tener al menos 8 caracteres.</li>
            <li class="${checks.hasUpper ? "check" : ""}">Tener al menos una letra mayúscula.</li>
            <li class="${checks.hasLower ? "check" : ""}">Tener al menos una letra minúscula.</li>
            <li class="${checks.hasNumber ? "check" : ""}">Tener al menos un número.</li>
            <li class="${checks.hasSymbol ? "check" : ""}">Tener al menos un carácter especial.</li>
        </ul>
    </div>`;
    
    container.insertAdjacentHTML("beforeend", alert);
}