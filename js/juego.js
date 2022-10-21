let buscaminas = {
	filas: 10,
	columnas: 10,
	minas: (filas*columnas/2),
	campoMinas:[]
}
function pintarTab() {
	if (!document.getElementById("idCelda_1_1")) {
		let tablero = document.querySelector("#tablero")
		for (let f = 1; f <= buscaminas.filas; f++) {
			for (let c = 1; c <= buscaminas.columnas; c++) {
				let nuevoDiv = document.createElement("div")
				nuevoDiv.setAttribute("id","idCelda_" + f + "_" + c)
				tablero.appendChild(nuevoDiv)
			}
		}
	}
}
function generarCampoMinas() {
	for (let fila = 0; fila < buscaminas.filas; fila++) {
		campoMinas[fila] = new Array(buscaminas.columnas)
	}
}
function esparcirMinas() {
	let minasColocadas = 0
	while (minasColocadas < minasTotales) {
		let fila = Math.floor(Math.random() * (numF))
		let columna = Math.floor(Math.random() * (numC))

		if (campoMinas[fila][columna] != "1") {
			campoMinas[fila][columna] = "1"
			document.getElementById(`idCelda_${fila+1}_${columna+1}`).innerHTML = "0"
			minasColocadas++;
		}
	}
	console.log(campoMinas)
	
}
function prueba() {
	pintarTab()
	generarCampoMinas()
	esparcirMinas()
}