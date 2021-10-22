import * as UI from './interfaz.js'
import * as API from './API.js'

window.onload = () => {
    API.consultarTopTenCriptomonedas();
    formulario.addEventListener('submit', validarFormulario);
}


function validarFormulario(e){
    e.preventDefault();

    // Selecciona los valores
    const moneda = UI.selectorMoneda.value;
    const criptomoneda = UI.selectorCriptomoneda.value;

    // Validan que no vengan vacíos
    if( moneda === '' || criptomoneda === ''){
        UI.mostarAlerta('Ambos campos son obligatorios', 'error', 2500);
        return;
    }

    // Hace la cotización
    API.cotizarCriptomoneda( moneda, criptomoneda);
}