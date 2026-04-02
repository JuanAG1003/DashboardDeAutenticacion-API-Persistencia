



export const valideUseEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailRegex.test(email);
}

export const validePassword = (password) => {
    const checks = {
        length:    /.{8,}/.test(password),  // al menos 8 carácteres
        hasUpper:  /[A-Z]/.test(password),  // al menos una mayúscula
        hasLower:  /[a-z]/.test(password),  // al menos una minúscula
        hasNumber: /\d/.test(password),     // al menos un número
        hasSymbol: /[\W_]/.test(password)   // al menos un carácter especia
    };

    let isValid = Object.values(checks).every(check => check === true)

    return {checks: checks, isValid: isValid }
}