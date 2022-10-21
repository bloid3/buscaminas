const buscaminas = new Map()
buscaminas.set("Filas", 10)
buscaminas.set("Columnas", 10)
buscaminas.set("Minas", 50)




function pintarTab(numC, numF) {
	if (!document.getElementById("idCelda_1_1")) {
		let tablero = document.querySelector("#tablero")
		for (let f = 1; f <= numF; f++) {
			for (let c = 1; c <= numC; c++) {
				let nuevoDiv = document.createElement("div")
				nuevoDiv.setAttribute("id","idCelda_" + f + "_" + c)
				tablero.appendChild(nuevoDiv)
			}
		}
	}
}
function generarCampoMinas(numC, numF) {
	campoMinas = new Array(numF)
	for (let fila = 0; fila < numF; fila++) {
		campoMinas[fila] = new Array(numC)
	}
}
function esparcirMinas(numC, numF, minasTotales) {
	let minasColocadas = 0
	while (minasColocadas < minasTotales) {
		let fila = Math.floor(Math.random() * numF)
		let columna = Math.floor(Math.random() * numC)

		if (campoMinas[fila][columna] != "B") {
			campoMinas[fila][columna] = "B"
		}
		minasColocadas++;
	}
	console.log(campoMinas)
}