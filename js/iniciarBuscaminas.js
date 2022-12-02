const buscaminas = new Map([
	["FILAS", 10],
	["COLUMNAS", 10],
	["NUM_BOMBAS", 16]
]);

let tablero_recursivo = []

function jugar() {
	generarTableroJS()
	dibujarTableroHTML()
	colocarBombasTableroJS()
	asociarEventClick()
}

function generarTableroJS() {
	campominas = new Array(buscaminas.get("FILAS"))
	for (let fila = 0; fila < buscaminas.get("FILAS"); fila++) {
		campominas[fila] = new Array(buscaminas.get("COLUMNAS"))
	}
}

function numeroAleatorio(num) {
	return Math.floor(Math.random() * num)
}

let minasColocadas = 0
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

function asociarEventClick(){
    let divs = document.querySelectorAll("div[id^=idCelda]");
    divs.forEach(e => e.addEventListener("click",mostrarCoordenadas))
    divs.forEach(e => e.addEventListener("contextmenu",ponerBandera))
}

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
		liberarRecursivo(x-1, y-1)
	} else {
		event.target.innerHTML = calcularMinas(x-1,y-1)
		event.target.style.background = "#e76f51"
	}
	
}
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

function ponerBandera(event) {
	event.preventDefault()
	if (event.target.innerHTML == "") {
		event.target.innerHTML = "🚩"
	} else if (event.target.innerHTML == "🚩"){
		event.target.innerHTML = ""
	}
}

function liberarRecursivo(x,y){
	let cercanos = [[x,y-1],[x-1,y],[x,y+1],[x+1,y]]
	if (campominas[x][y] == 0) {
		for (let i = 0; i < cercanos.length; i++) {
			if(cercanos[i][0]>=0 && cercanos[i][1]>=0){
				if(cercanos[i][0]<buscaminas.get("FILAS") && cercanos[i][1]<buscaminas.get("COLUMNAS")){
					if(tablero[cercanos[i][0]][cercanos[i][1]] == 0 && tablero_recursivo[cercanos[i][0]][cercanos[i][1]] == 0){                                
						document.getElementById(`idCelda_${cercanos[i][0]}_${cercanos[i][1]}`).setAttribute("style")
						tablero_recursivo[cercanos[i][0]][cercanos[i][1]]="v"
						liberarRecursivo(cercanos[i][0] , cercanos[i][1] )

					}    
				}
			}
		}
	}
}

	 

