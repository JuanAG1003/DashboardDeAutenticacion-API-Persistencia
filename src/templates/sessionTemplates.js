


export function loginTemplate() {
    return `
    <div class="login__container">
        <h1>¡Binevenido de vuelta!</h1>
        <p>Por favor ingresa tus datos</p>
        <form class="login__form">
            <div class="form__input-container" id="containerEmail">
                <input placeholder="E-mail" type="email"  id="inputEmail" name="email">
            </div>
            <div class="form__input-container" id="containerPassword">
                <input placeholder="password" type="password" id="inputPassword" name="password">
            </div>
            <input type="submit" value="Iniciar sesión">
        </form>
        <label>¿No tienes cuenta? <span id="goto-signup">Regístrate</span></label>
    </div>`;
}

export function signupTemplate() {
    return `
    <div class="login__container">
        <h1>Crea una cuenta</h1>
        <form class="login__form">
            <div class="form__input-container" id="containerName">
                <input placeholder="Full Name" type="text" id="inputName" name="fullName">
            </div>
            <div class="form__input-container" id="containerEmail">
                <input placeholder="E-mail" type="email"  id="inputEmail" name="email">
            </div>
            <div class="form__input-container" id="containerPassword">
                <input placeholder="password" type="password" id="inputPassword" name="password">
            </div>
            <input type="submit" value="Crear cuenta">
        </form>
        <label>¿Ya tienes una cuenta? <span id="goto-login">Inicia sesión</span></label>
    </div>`;
}