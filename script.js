window.onload = function() {

let cartas = [];

// crear 130 cartas
for(let i=1;i<=130;i++){
    cartas.push({
        id:i,
        nombre:"Carta " + i,
        img: "https://via.placeholder.com/120x170?text=" + i,
        tengo:false
    });
}

// cargar progreso
if(localStorage.getItem("cartas")){
    cartas = JSON.parse(localStorage.getItem("cartas"));
}

const contenedor = document.getElementById("contenedor");

function render(){
    contenedor.innerHTML = "";

    let tengo = 0;

    cartas.forEach(carta => {
        let div = document.createElement("div");
        div.classList.add("carta");

        if(carta.tengo){
            div.classList.add("tengo");
            tengo++;
        }

        div.innerHTML = `
            <div class="carta-inner">
                <div class="carta-front"></div>

                <div class="carta-back">
                    <img src="${carta.img}" 
                         onerror="this.src='https://via.placeholder.com/120x170?text=${carta.id}'">
                    <p>${carta.id}. ${carta.nombre}</p>
                </div>
            </div>
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