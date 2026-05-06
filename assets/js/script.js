window.onload = function() {

    let cartas = [];

    // crear 130 cartas
    for(let i = 1; i <= 130; i++){
        cartas.push({
            id: i,
            nombre: "Carta " + i,
            img: `assets/img_pkm/8BXG_EN_${i}.png`,
            tengo: false
        });
    }

    // cargar progreso
    if(localStorage.getItem("cartas")){
        let guardadas = JSON.parse(localStorage.getItem("cartas"));
        cartas = guardadas.map(c => ({
            ...c,
            img: `assets/img_pkm/8BXG_EN_${c.id}.png`
        }));
    }

    const contenedor = document.getElementById("contenedor");

    function render(){
        contenedor.innerHTML = "";

        let tengo = 0;

        cartas.forEach(carta => {
            let div = document.createElement("div");
            div.classList.add("carta");

            if(!carta.tengo){
                div.classList.add("bloqueada");
            } else {
                tengo++;
            }

            div.innerHTML = `
                <img src="${carta.img}" 
                     onerror="this.src='https://via.placeholder.com/120x170?text=${carta.id}'">
                <p>${carta.id}. ${carta.nombre}</p>
            `;

            div.onclick = () => {
                // Si no ha iniciado sesión, mostrar modal
                if (localStorage.getItem("logueado") !== "true") {
                    mostrarModal();
                    return;
                }
                // Si está logueado, alternar estado de la carta
                carta.tengo = !carta.tengo;
                guardar();
                render();
            };

            contenedor.appendChild(div);
        });

        document.getElementById("tienes").innerText = tengo;
        document.getElementById("faltan").innerText = cartas.length - tengo;
    }

    function guardar(){
        localStorage.setItem("cartas", JSON.stringify(cartas));
    }

    render();
    actualizarHeader();
};

/* ---------- Autenticación ---------- */

// Muestra el modal de autenticación
function mostrarModal() {
    document.getElementById("modalAuth").classList.add("active");
    // Por defecto muestra el formulario de login
    mostrarFormulario('login');
}

// Oculta el modal
function cerrarModal2() {
    document.getElementById("modalAuth").classList.remove("active");
}

// Alterna entre login y registro
function mostrarFormulario(tipo) {
    const formLogin = document.getElementById("formLogin");
    const formRegistro = document.getElementById("formRegistro");
    if (tipo === 'login') {
        formLogin.classList.remove("hidden");
        formRegistro.classList.add("hidden");
    } else {
        formLogin.classList.add("hidden");
        formRegistro.classList.remove("hidden");
    }
}

// Iniciar sesión
function login() {
    const user = document.getElementById("loginUser").value.trim();
    const pass = document.getElementById("loginPass").value.trim();

    if (!user || !pass) {
        alert("Completa todos los campos");
        return;
    }

    // Verificar credenciales guardadas
    const storedUser = JSON.parse(localStorage.getItem("usuario"));
    if (storedUser && storedUser.user === user && storedUser.pass === pass) {
        localStorage.setItem("logueado", "true");
        cerrarModal();
        actualizarHeader();
        // Refrescar la vista para habilitar interacción
        location.reload(); // o simplemente re-renderizar sin recargar, pero recargar es más sencillo
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}

// Registrar nuevo usuario
function register() {
    const user = document.getElementById("regUser").value.trim();
    const pass = document.getElementById("regPass").value.trim();

    if (!user || !pass) {
        alert("Completa todos los campos");
        return;
    }

    // Guardar usuario
    localStorage.setItem("usuario", JSON.stringify({ user, pass }));
    localStorage.setItem("logueado", "true");
    cerrarModal();
    actualizarHeader();
    location.reload();
}

// Cerrar sesión
function logout() {
    localStorage.setItem("logueado", "false");
    actualizarHeader();
    location.reload();
}

// Actualiza el encabezado con el estado de la sesión
function actualizarHeader() {
    const header = document.getElementById("accionesHeader");
    const logueado = localStorage.getItem("logueado") === "true";
    const data = JSON.parse(localStorage.getItem("usuario"));

    if (logueado && data) {
        header.innerHTML = `
            <span id="userName">👤 ${data.user}</span>
            <button onclick="logout()">🚪 Cerrar sesión</button>
        `;
    } else {
        header.innerHTML = `
            <span id="userName">👤 Invitado</span>
            <button onclick="mostrarModal()">🔐 Acceder / Registrarse</button>
        `;
    }
}

function abrirModal1() {
  document.getElementById("miModal").style.display = "block";
}

function cerrarModal1() {
  document.getElementById("miModal").style.display = "none";
}