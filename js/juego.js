function pintarTab(numC, numF) {
	let tablero = document.querySelector("#tablero")
	for (let f = 1; f <= numF; f++) {
		for (let c = 1; c <= numC; c++) {
			let nuevoDiv = document.createElement("div")
			nuevoDiv.setAttribute("id","idCelda_" + f + "_" + c)
			tablero.appendChild(nuevoDiv)
		}
	}
}