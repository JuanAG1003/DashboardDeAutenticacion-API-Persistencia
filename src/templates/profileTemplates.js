



export function dashboardTemplate() {
    return `
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
    </section>`;
}

export function cardTemplate(fullName, jobTitle, email) {
    return`
    <div class="wrapper__main-card">
        <h3>Nombre:</h3>
        <p>${fullName}</p>
        <h3>Oficio:</h3>
        <p>${jobTitle} </p>
        <h3>E-mail:</h3>
        <p>${email} </p>
    </div>`;
}