const buscaminas = new Map([
	["FILAS", 10],
	["COLUMNAS", 10],
	["NUM_BOMBAS", 16]
]);
let tablero_recursivo = []


//Funcion principal
function jugar() {
	generarTableroJS()
	dibujarTableroHTML()
	colocarBombasTableroJS()
	asociarEventClick()
}


//Generamos un array para saber donde están las minas
function generarTableroJS() {
	campominas = new Array(buscaminas.get("FILAS"))
	for (let fila = 0; fila < buscaminas.get("FILAS"); fila++) {
		campominas[fila] = new Array(buscaminas.get("COLUMNAS"))
	}
}


//Funcion para generar un número aleatorio
function numeroAleatorio(num) {
	return Math.floor(Math.random() * num)
}

let minasColocadas = 0

//Colocamos las minas pertinentes accediendo al mapa
function colocarBombasTableroJS() {
	while (minasColocadas < buscaminas.get("NUM_BOMBAS")) {
		let fila = numeroAleatorio(buscaminas.get("FILAS"))
		let columna = numeroAleatorio(buscaminas.get("COLUMNAS"))

		if (campominas[fila][columna] != "1") {
			campominas[fila][columna] = "1"
			minasColocadas++;
		}
	}
}

//Funcion para dibujar los divs en HTML, mediante grid
function dibujarTableroHTML() {
	if (!document.getElementById("idCelda_1_1")) {
		let tablero = document.querySelector("#tablero")
		for (let f = 1; f <= buscaminas.get("FILAS"); f++) {
			for (let c = 1; c <= buscaminas.get("COLUMNAS"); c++) {
				let nuevoDiv = document.createElement("div")
				nuevoDiv.setAttribute("id","idCelda_" + f + "_" + c)
				tablero.appendChild(nuevoDiv)
			}
		}
	}
}


//Funcion para añadir eventos por cada click
function asociarEventClick(){
    let divs = document.querySelectorAll("div[id^=idCelda]");
    divs.forEach(e => e.addEventListener("click",mostrarCoordenadas))
    divs.forEach(e => e.addEventListener("contextmenu",ponerBandera))
}

//Funcino click izquierdo
function mostrarCoordenadas(event) {
	let coordenadas = event.target.id.split("_")
	let x = coordenadas[1]
	let y = coordenadas[2]
	if (campominas[x-1][y-1] == 1) {
		event.target.innerHTML = "💣"
		event.target.style.background = "#e76f51"
	} else if (calcularMinas(x-1,y-1) == 0) {
		event.target.innerHTML = " "
		event.target.style.background = "#e76f51"
		liberarRecursivo(x, y)
	} else {
		event.target.innerHTML = calcularMinas(x-1,y-1)
		event.target.style.background = "#e76f51"
	}
	
}

//Funcion para calcular minas
function calcularMinas(fila, columna) {
	let numMinas = 0;
	for (let f = fila-1; f <= fila+1; f++) {
		for (let c = columna-1;c <= columna+1; c++) {
			if ((f>= 0 && f<=9) && (c>=0 && c<=9)) {
				if (campominas[f][c] == "1") {
					numMinas++;
				}
			}
		}
	}
	return numMinas
}


//Funcion click derecho
function ponerBandera(event) {
	event.preventDefault()
	if (event.target.innerHTML == "") {
		event.target.innerHTML = "🚩"
	} else if (event.target.innerHTML == "🚩"){
		event.target.innerHTML = ""
	}
}

//Funcion recursica
function liberarRecursivo(x, y) {
	let fila = parseInt(x)
	let columna = parseInt(y)
	let celda = document.getElementById("idCelda_"+fila+"_"+columna)
	if (celda.innerHTML == "") {
		if (calcularMinas(fila-1,columna-1) == 0) {
			celda.innerHTML = " "
			celda.style.background = "#e76f51"
			tablero_recursivo.push([fila-1,columna-1])
		} else {
			celda.innerHTML = calcularMinas(fila-1,columna-1)
			celda.style.background = "#e76f51"
		}
	} if (calcularMinas(fila-1,columna-1) == 0) {
		for (let f = fila-1; f <= fila+1; f++) {
			for (let c = columna-1;c <= columna+1; c++) {
				if ((f>= 1 && f<=10) && (c>=1 && c<=10)) {
					if (document.getElementById("idCelda_"+f+"_"+c).innerHTML == "") {
						liberarRecursivo(f, c)
						}
					}
				}
			}
		}
	}



	 

