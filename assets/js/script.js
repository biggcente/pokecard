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
            div.classList.add("bloqueada"); // 👈 si NO la tienes
        } else {
            tengo++;
        }

        div.innerHTML = `
            <img src="${carta.img}" 
                 onerror="this.src='https://via.placeholder.com/120x170?text=${carta.id}'">
            <p>${carta.id}. ${carta.nombre}</p>
        `;

        div.onclick = () => {
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

}

function irLogin(){
    window.location.href = "login.html";
}

// Mostrar usuario
let data = JSON.parse(localStorage.getItem("usuario"));

if(localStorage.getItem("logueado") === "true" && data){
    document.getElementById("userName").innerText = "👤 " + data.user;
}