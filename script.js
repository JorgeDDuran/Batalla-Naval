const cinta = document.getElementById('cinta');
const celdas = [];
let posicionActual = Math.floor(Math.random() * 30) + 1;

const barcos = [
    { longitud: 4, hundido: false },
    { longitud: 3, hundido: false },
    { longitud: 2, hundido: false }
];

const mensaje = document.getElementById('mensaje');
generarUbicacionesAleatorias();
let barcosDestruidos = 0; // Variable de control

function moverTuringMachine() {
    const instrucciones = document.getElementById('instrucciones').value;
    const movimientos = instrucciones.split(',');
    for (const movimiento of movimientos) {
        const [direccion, pasosStr] = movimiento.trim().split('');
        let pasos = parseInt(pasosStr);
        if (direccion === 'R') {
            for (let i = 0; i < pasos; i++) {
                while (posicionActual + 1 <= 30 && esCeldaVisitada(posicionActual + 1)) {
                    posicionActual++;
                }
                if (posicionActual + 1 <= 30) {
                    verificarBarcoEnCelda(posicionActual + 1);
                    posicionActual++;
                    actualizarPosicionJugador();
                } else {
                    mostrarMensaje("La Máquina de Turing ha llegado al límite de la cinta hacia la derecha.");
                    return;
                }
            }
        } else if (direccion === 'L') {
            for (let i = 0; i < pasos; i++) {
                while (posicionActual - 1 >= 1 && esCeldaVisitada(posicionActual - 1)) {
                    posicionActual--;
                }
                if (posicionActual - 1 >= 1) {
                    verificarBarcoEnCelda(posicionActual - 1);
                    posicionActual--;
                    actualizarPosicionJugador();
                } else {
                    mostrarMensaje("La Máquina de Turing ha llegado al límite de la cinta hacia la izquierda.");
                    return;
                }
            }
        }
    }

    mostrarMensaje("Movimiento completado.");
    // Verificar si se han destruido barcos
    const nuevosBarcosDestruidos = barcos.filter(barco => barco.hundido).length;
    
    if (nuevosBarcosDestruidos > barcosDestruidos) {
        barcosDestruidos = nuevosBarcosDestruidos;
        if (barcosDestruidos === 1) {
            mostrarMensaje("Alcanzo un estado de aceptacion");
        } else if (barcosDestruidos === 2) {
            mostrarMensaje("Alcanzo un estado de aceptacion");
        } else if (barcosDestruidos === 3) {
            mostrarMensaje("Alcanzo un estado de aceptacion ¡Ganaste!");
            return; // Evitar mostrar mensajes adicionales
        }
    }
}
function esCeldaVisitada(posicion) {
    const celda = document.getElementById(`celda-${posicion}`);
    return celda.classList.contains('visitada');
}
function mostrarMensaje(mensaje) {
    mensaje.innerText = mensaje;
    //console.log(mensaje);
    txtmensaje = document.getElementById('mensaje')
    txtmensaje.innerHTML = mensaje
}
function generarUbicacionesAleatorias() {
    for (let i = 1; i <= 30; i++) {
        const celda = document.createElement('div');
        celda.className = 'celda';
        celda.id = `celda-${i}`;
        cinta.appendChild(celda);
    }
    for (const barco of barcos) {
        let ubicacionValida = false;
        while (!ubicacionValida) {
            const ubicacion = Math.floor(Math.random() * 30) + 1;
            const longitud = barco.longitud;
            const ubicacionFinal = ubicacion + longitud - 1;

            if (ubicacionFinal <= 30 && !barcos.some(b => b !== barco && b.ubicacion <= ubicacionFinal && b.ubicacion + b.longitud - 1 >= ubicacion)) {
                ubicacionValida = true;
                barco.ubicacion = ubicacion;

                for (let i = ubicacion; i <= ubicacionFinal; i++) {
                    celdas.push(i);
                }
            }
        }
    }
    // Inicializar la posición del jugador
    actualizarPosicionJugador();
}

function verificarBarcoEnCelda(posicion) {
    const celda = document.getElementById(`celda-${posicion}`);
    for (const barco of barcos) {
        if (barco.ubicacion <= posicion && barco.ubicacion + barco.longitud - 1 >= posicion) {
            celda.classList.add('barco');
            const celdasBarco = Array.from({ length: barco.longitud }, (_, i) => barco.ubicacion + i);
            if (celdasBarco.every(c => celdas.includes(c))) {
                barco.hundido = true;
                if (barcos.every(b => b.hundido)) {
                    mostrarMensaje("Alcanzo un estado de aceptacion ¡Ganaste!");
                }
            }
            return;
        }
    }
    celda.classList.remove('barco');
    celda.classList.add('visitada'); // Bloquear celda visitada
}
function actualizarPosicionJugador() {
    // Eliminar la clase 'jugador' de todas las celdas
    celdas.forEach(pos => {
        const celda = document.getElementById(`celda-${pos}`);
        celda.classList.remove('jugador');
    });

    // Agregar la clase 'jugador' a la celda de la posición actual
    const celdaActual = document.getElementById(`celda-${posicionActual}`);
    celdaActual.classList.add('jugador');
}






