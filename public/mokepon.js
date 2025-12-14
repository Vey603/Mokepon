// Variables Globales
let mokepones = []; // Array que guarda objetos/mokepones
let mokeponesEnemigos = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let vidasJugador = 3;
let vidasEnemigo = 3;
let opcionMokepones;
let opcionAtaques;
let mascotaJugador;
let mascotaJugadorObjeto;
const sectionVerMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa");
let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = "./assets/mokeMapa.png";
const anchoMaximoMapa = 800;
let alturaDeseada;
let anchoMapa = window.innerWidth - 20;

if (anchoMapa > anchoMaximoMapa) {
  anchoMapa = anchoMaximoMapa - 20;
}

alturaDeseada = (anchoMapa * 600) / 800;

mapa.width = anchoMapa;
mapa.height = alturaDeseada;

// Variables Globales - objetos HTML en iniciarJuego()
const sectionAtaque = document.getElementById("seleccionar-ataque");
const sectionReiniciar = document.getElementById("reiniciar");
const botonMascotaJugador = document.getElementById("boton-mascota");
let botonFuego;
let botonAgua;
let botonTierra;
const botonReinicar = document.getElementById("boton-reiniciar");
const contenedorTarjeta_1 = document.getElementById("contenedor-tarjeta_1");

// Variables Globales - objetos HTML en seleccionarMascotaJugador()
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let inputLangostelvis;
let inputTucapalma;
let inputPydos;
const spanMascotaJugador = document.getElementById("mascota-jugador");
const sectionMascota = document.getElementById("seleccionar-mascota");
let jugadorId = null;
let enemigoId = null;

// Variables Globales - objetos HTML en seleccionarMascotaEnemigo()
const spanMascotaEnemigo = document.getElementById("mascota-enemigo");
let ataquesMokeponEnemigo;

// Variables Globales - objetos HTML en mostrarAtaques()
const contenedorAtaques = document.getElementById("contenedor-ataques");
let botones = [];

// Variables Globales - objetos HTML en secuenciaAtaques()

// Variables Globales - objetos HTML en crearMensaje()
const sectionMensajes = document.getElementById("resultado");
const ataquesJugador = document.getElementById("ataques-jugador");
const ataquesEnemigo = document.getElementById("ataques-enemigo");

// Variables Globales - objetos HTML en indexAmbosAtaques()
let indexAtaqueJugador;
let indexAtaqueEnemigo;

// Variables Globales - objetos HTML en combate()
const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");
let victoriasJugador = 0;
let victoriasEnemigo = 0;

// Clase Mokepon - Crear nuevos Mokepones //? Las vidas pueden ser eliminadas
class Mokepon {
  constructor(nombre, imagen, vida, fotoAvatar, id = null) {
    this.id = id;
    this.nombre = nombre;
    this.imagen = imagen;
    this.vida = vida;
    this.mapaFoto = new Image();
    this.mapaFoto.src = fotoAvatar;
    this.ataques = [];
    this.ancho = 60;
    this.alto = 60;
    this.x = random(0, mapa.width - this.ancho);
    this.y = random(0, mapa.height - this.alto);
    this.velocidadX = 0;
    this.velocidadY = 0;
  }

  pintarMokepon() {
    lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto);
  }
}

// Creación de Mokepones - Objetos de Clase
let hipodoge = new Mokepon(
  "Hipodoge",
  "./assets/Squirtle.png",
  5,
  "./assets/SquirtleAvatar.png"
);
let capipepo = new Mokepon(
  "Capipepo",
  "./assets/Bulbasaur.png",
  5,
  "./assets/BulbasaurAvatar.png"
);
let ratigueya = new Mokepon(
  "Ratigueya",
  "./assets/Charmander.png",
  5,
  "./assets/CharmanderAvatar.png"
);
// let langostelvis = new Mokepon(
//   "Langostelvis",
//   "./assets/Magikarp.png",
//   5,
//   "./assets/MagikarpAvatar.png"
// );
// let tucapalma = new Mokepon(
//   "Tucapalma",
//   "./assets/Snorlax.png",
//   5,
//   "./assets/SnorlaxAvatar.png"
// );
// let pydos = new Mokepon(
//   "Pydos",
//   "./assets/Flaeron.png",
//   5,
//   "./assets/FlaeronAvatar.png"
// );

// let langostelvisEnemigo = new Mokepon(
//   "Langostelvis",
//   "./assets/Magikarp.png",
//   5,
//   "./assets/MagikarpAvatar.png"
// );
// let tucapalmaEnemigo = new Mokepon(
//   "Tucapalma",
//   "./assets/Snorlax.png",
//   5,
//   "./assets/SnorlaxAvatar.png"
// );
// let pydosEnemigo = new Mokepon(
//   "Pydos",
//   "./assets/Flaeron.png",
//   5,
//   "./assets/FlaeronAvatar.png"
// );

const hipodogeAtaques = [
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🌱", id: "boton-tierra" },
];

const capipepoAtaques = [
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" },
];

const ratigueyaAtaques = [
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "💧", id: "boton-agua" },
];

// Agregar Ataques a cada objeto/mokepon - Objetos Literales
hipodoge.ataques.push(...hipodogeAtaques);
capipepo.ataques.push(...capipepoAtaques);
ratigueya.ataques.push(...ratigueyaAtaques);

// langostelvis.ataques.push(
//   { nombre: "💧", id: "boton-agua" },
//   { nombre: "💧", id: "boton-agua" },
//   { nombre: "💧", id: "boton-agua" },
//   { nombre: "🔥", id: "boton-fuego" },
//   { nombre: "🌱", id: "boton-tierra" }
// );

// tucapalma.ataques.push(
//   { nombre: "🌱", id: "boton-tierra" },
//   { nombre: "🌱", id: "boton-tierra" },
//   { nombre: "🌱", id: "boton-tierra" },
//   { nombre: "💧", id: "boton-agua" },
//   { nombre: "🔥", id: "boton-fuego" }
// );

// pydos.ataques.push(
//   { nombre: "🔥", id: "boton-fuego" },
//   { nombre: "🔥", id: "boton-fuego" },
//   { nombre: "🔥", id: "boton-fuego" },
//   { nombre: "🌱", id: "boton-tierra" },
//   { nombre: "💧", id: "boton-agua" }
// );

// Empujar cada objeto/mokepon al Array
mokepones.push(hipodoge, capipepo, ratigueya);

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function iniciarJuego() {
  sectionAtaque.style.display = "none";
  sectionVerMapa.style.display = "none";
  sectionReiniciar.style.display = "none";

  mokepones.forEach((mokepon) => {
    opcionMokepones = `
    <input type="radio" name="mascota" id=${mokepon.nombre} />
    <label for=${mokepon.nombre} class="tarjeta-de-mokepon">
        <p>${mokepon.nombre}</p>
        <img src=${mokepon.imagen} alt=${mokepon.nombre} />
    </label>
    `;
    contenedorTarjeta_1.innerHTML += opcionMokepones;
  });

  inputHipodoge = document.getElementById("Hipodoge");
  inputCapipepo = document.getElementById("Capipepo");
  inputRatigueya = document.getElementById("Ratigueya");
  // inputLangostelvis = document.getElementById("Langostelvis");
  // inputTucapalma = document.getElementById("Tucapalma");
  // inputPydos = document.getElementById("Pydos");

  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
  botonReinicar.addEventListener("click", reiniciarJuego);

  unirseAlJuego();
}

function unirseAlJuego() {
  fetch("http://localhost:8080/unirse").then(function (res) {
    if (res.ok) {
      res.text().then(function (respuesta) {
        console.log(respuesta);
        jugadorId = respuesta;
      });
    }
  });
}

function seleccionarMascotaJugador() {
  if (inputHipodoge.checked) {
    spanMascotaJugador.innerHTML = inputHipodoge.id;
    mascotaJugador = inputHipodoge.id;
  } else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = inputCapipepo.id;
    mascotaJugador = inputCapipepo.id;
  } else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = inputRatigueya.id;
    mascotaJugador = inputRatigueya.id;
  } else {
    alert("Por favor, selecciona una mascota");
    return;
  }

  // if (inputHipodoge.checked) {
  //   spanMascotaJugador.innerHTML = inputHipodoge.id;
  //   mascotaJugador = inputHipodoge.id;
  // } else if (inputCapipepo.checked) {
  //   spanMascotaJugador.innerHTML = inputCapipepo.id;
  //   mascotaJugador = inputCapipepo.id;
  // } else if (inputRatigueya.checked) {
  //   spanMascotaJugador.innerHTML = inputRatigueya.id;
  //   mascotaJugador = inputRatigueya.id;
  // } else if (inputLangostelvis.checked) {
  //   spanMascotaJugador.innerHTML = inputLangostelvis.id;
  //   mascotaJugador = inputLangostelvis.id;
  // } else if (inputTucapalma.checked) {
  //   spanMascotaJugador.innerHTML = inputTucapalma.id;
  //   mascotaJugador = inputTucapalma.id;
  // } else if (inputPydos.checked) {
  //   spanMascotaJugador.innerHTML = inputPydos.id;
  //   mascotaJugador = inputPydos.id;
  // } else {
  //   alert("Por favor, selecciona una mascota");
  //   return;
  // }

  console.log(mascotaJugador);

  sectionVerMapa.style.display = "flex";
  sectionMascota.style.display = "none";

  seleccionarMokepon(mascotaJugador);
  iniciarMapa();
  extraerAtaques(mascotaJugador);
}

function seleccionarMokepon(mascotaJugador) {
  fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mokepon: mascotaJugador,
    }),
  });
}

function extraerAtaques(mascotaJugador) {
  let ataques;

  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador == mokepones[i].nombre) {
      ataques = mokepones[i].ataques;
    }
  }
  mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    opcionAtaques = `
    <button id=${ataque.id} class="boton-ataque bAtaque">${ataque.nombre}</button>
    `;

    contenedorAtaques.innerHTML += opcionAtaques;
  });

  botonFuego = document.getElementById("boton-fuego");
  botonAgua = document.getElementById("boton-agua");
  botonTierra = document.getElementById("boton-tierra");

  botones = document.querySelectorAll(".bAtaque");
}

function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      if (e.target.textContent == "🔥") {
        ataqueJugador.push("FUEGO");
        console.log(ataqueJugador);
        boton.style.background = "transparent";
        boton.disabled = true;
      } else if (e.target.textContent == "💧") {
        ataqueJugador.push("AGUA");
        console.log(ataqueJugador);
        boton.style.background = "transparent";
        boton.disabled = true;
      } else {
        ataqueJugador.push("TIERRA");
        console.log(ataqueJugador);
        boton.style.background = "transparent";
        boton.disabled = true;
      }
      if (ataqueJugador.length == 5) {
        enviarAtaques();
      }
    });
  });
}

function enviarAtaques() {
  fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ataques: ataqueJugador,
    }),
  });

  intervalo = setInterval(obtenerAtaques, 50);
}

function obtenerAtaques() {
  fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`).then(function (
    res
  ) {
    if (res.ok) {
      res.json().then(function ({ ataques }) {
        if (ataques.length == 5) {
          ataqueEnemigo = ataques;
          combate();
        }
      });
    }
  });
}

function seleccionarMascotaEnemigo(enemigo) {
  spanMascotaEnemigo.innerHTML = enemigo.nombre;
  ataquesMokeponEnemigo = enemigo.ataques;
  secuenciaAtaque();
}

function ataqueRandomEnemigo() {
  console.log(ataquesMokeponEnemigo);
  let numeroRandom = random(0, ataquesMokeponEnemigo.length - 1);
  if (ataquesMokeponEnemigo[numeroRandom].nombre == "🔥") {
    ataqueEnemigo.push("FUEGO");
  } else if (ataquesMokeponEnemigo[numeroRandom].nombre == "💧") {
    ataqueEnemigo.push("AGUA");
  } else {
    ataqueEnemigo.push("TIERRA");
  }
  console.log(ataqueEnemigo);

  iniciarPelea();
}

function iniciarPelea() {
  if (ataqueJugador.length == 5) {
    combate();
  }
}

function crearMensaje(resultado) {
  let parrafoAtaqueJugador = document.createElement("p");
  let parrafoAtaqueEnemigo = document.createElement("p");

  sectionMensajes.innerHTML = resultado;
  parrafoAtaqueJugador.innerHTML = indexAtaqueJugador;
  parrafoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo;

  ataquesJugador.appendChild(parrafoAtaqueJugador);
  ataquesEnemigo.appendChild(parrafoAtaqueEnemigo);
}

function indexAmbosOponentes(jugador, enemigo) {
  indexAtaqueJugador = ataqueJugador[jugador];
  indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate() {
  clearInterval(intervalo);

  for (let index = 0; index < ataqueJugador.length; index++) {
    if (ataqueJugador[index] == ataqueEnemigo[index]) {
      indexAmbosOponentes(index, index);
      crearMensaje("EMPATE");
    } else if (
      (ataqueJugador[index] == "FUEGO" && ataqueEnemigo[index] == "TIERRA") ||
      (ataqueJugador[index] == "AGUA" && ataqueEnemigo[index] == "FUEGO") ||
      (ataqueJugador[index] == "TIERRA" && ataqueEnemigo[index] == "AGUA")
    ) {
      indexAmbosOponentes(index, index);
      crearMensaje("GANASTE 🎉");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else {
      indexAmbosOponentes(index, index);
      crearMensaje("PERDISTE 😭");
      victoriasEnemigo++;
      spanVidasEnemigo.innerHTML = victoriasEnemigo;
    }
  }

  revisarVictorias();
}

function revisarVictorias() {
  if (victoriasJugador == victoriasEnemigo) {
    crearMensajeFinal("¡HUBO UN EMPATE!");
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("¡FELICIDADES. HAS GANADO EL JUEGO!");
  } else {
    crearMensajeFinal("TE HAN DERROTADO");
  }
}

function crearMensajeFinal(resultadoFinal) {
  sectionMensajes.innerHTML = resultadoFinal;

  botonMascotaJugador.disabled = true;

  sectionReiniciar.style.display = "block";
}

function reiniciarJuego() {
  location.reload();
}

function pintarCanvas() {
  mascotaJugadorObjeto.x += mascotaJugadorObjeto.velocidadX;
  mascotaJugadorObjeto.y += mascotaJugadorObjeto.velocidadY;
  lienzo.clearRect(0, 0, mapa.width, mapa.height); //? Puede ser eliminado
  lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);
  mascotaJugadorObjeto.pintarMokepon();
  enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y);
  mokeponesEnemigos.forEach(function (mokepon) {
    mokepon.pintarMokepon();
    if (
      mascotaJugador.velocidadX != 0 ||
      mascotaJugadorObjeto.velocidadY != 0
    ) {
      revisarColision(mokepon);
    }
  });
}

function enviarPosicion(x, y) {
  fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      x,
      y,
    }),
  }).then(function (res) {
    if (res.ok) {
      res.json().then(function ({ enemigos }) {
        console.log(enemigos);
        mokeponesEnemigos = enemigos.map(function (enemigo) {
          let mokeponEnemigo = null;
          const mokeponNombre = enemigo.mokepon.nombre || "";

          if (mokeponNombre == "Hipodoge") {
            mokeponEnemigo = new Mokepon(
              "Hipodoge",
              "./assets/Squirtle.png",
              5,
              "./assets/SquirtleAvatar.png",
              enemigo.id
            );
          } else if (mokeponNombre == "Capipepo") {
            mokeponEnemigo = new Mokepon(
              "Capipepo",
              "./assets/Bulbasaur.png",
              5,
              "./assets/BulbasaurAvatar.png",
              enemigo.id
            );
          } else if (mokeponNombre == "Ratigueya") {
            mokeponEnemigo = new Mokepon(
              "Ratigueya",
              "./assets/Charmander.png",
              5,
              "./assets/CharmanderAvatar.png",
              enemigo.id
            );
          }
          mokeponEnemigo.x = enemigo.x;
          mokeponEnemigo.y = enemigo.y;

          return mokeponEnemigo;
        });
      });
    }
  });
}

function teclaPresionada(event) {
  switch (event.key) {
    case "w":
    case "ArrowUp":
      moverArriba();
      break;
    case "a":
    case "ArrowLeft":
      moverIzquierda();
      break;
    case "s":
    case "ArrowDown":
      moverAbajo();
      break;
    case "d":
    case "ArrowRight":
      moverDerecha();
      break;
    default:
      break;
  }
}

function moverArriba() {
  mascotaJugadorObjeto.velocidadY = -10;
}

function moverIzquierda() {
  mascotaJugadorObjeto.velocidadX = -10;
}

function moverAbajo() {
  mascotaJugadorObjeto.velocidadY = 10;
}

function moverDerecha() {
  mascotaJugadorObjeto.velocidadX = 10;
}

function detenerMovimiento() {
  mascotaJugadorObjeto.velocidadX = 0;
  mascotaJugadorObjeto.velocidadY = 0;
}

function iniciarMapa() {
  mascotaJugadorObjeto = obtenerObjetoMokepon();
  intervalo = setInterval(pintarCanvas, 50);

  window.addEventListener("keydown", teclaPresionada);
  window.addEventListener("keyup", detenerMovimiento);
}

function obtenerObjetoMokepon() {
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador == mokepones[i].nombre) {
      return mokepones[i];
    }
  }
}

function revisarColision(enemigo) {
  const arribaEnemigo = enemigo.y;
  const abajoEnemigo = enemigo.y + enemigo.alto;
  const izquierdaEnemigo = enemigo.x;
  const derechaEnemigo = enemigo.x + enemigo.ancho;

  const arribaMascota = mascotaJugadorObjeto.y;
  const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
  const izquierdaMascota = mascotaJugadorObjeto.x;
  const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;

  if (
    abajoMascota < arribaEnemigo ||
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota > derechaEnemigo
  ) {
    return;
  }
  detenerMovimiento();
  clearInterval(intervalo);
  enemigoId = enemigo.id;
  seleccionarMascotaEnemigo(enemigo);
  sectionAtaque.style.display = "flex";
  sectionVerMapa.style.display = "none";
}

window.addEventListener("load", iniciarJuego);
