const buscaminas = new Map ([
	["filas", 10],
	["columnas", 10],
	["minasTotales",50]
]);
let minasColocadas = 0
function pintarTab() {
	if (!document.getElementById("idCelda_1_1")) {
		let tablero = document.querySelector("#tablero")
		for (let f = 1; f <= buscaminas.get("filas"); f++) {
			for (let c = 1; c <= buscaminas.get("columnas"); c++) {
				let nuevoDiv = document.createElement("div")
				nuevoDiv.setAttribute("id","idCelda_" + f + "_" + c)
				tablero.appendChild(nuevoDiv)
			}
		}
	}
}
function generarCampoMinas() {
	campominas = new Array(buscaminas.get("filas"))
	for (let fila = 0; fila < buscaminas.get("filas"); fila++) {
		campominas[fila] = new Array(buscaminas.get("columnas"))
	}
}
function esparcirMinas() {
	while (minasColocadas < buscaminas.get("minasTotales")) {
		let fila = Math.floor(Math.random() * (buscaminas.get("filas")))
		let columna = Math.floor(Math.random() * (buscaminas.get("columnas")))

		if (campominas[fila][columna] != "1") {
			campominas[fila][columna] = "1"
			document.getElementById(`idCelda_${fila+1}_${columna+1}`).innerHTML = "0"
			minasColocadas++;
		}
	}
	console.log(campominas)
}
function prueba() {
	pintarTab()
	generarCampoMinas()
	esparcirMinas()
}