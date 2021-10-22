import * as UI from './interfaz.js'

// Código del instructor
// const objBusqueda = {
//     moneda: '',
//     criptomoneda: ''
// };


window.onload = () => {
    consultarTopTenCriptomonedas();
    formulario.addEventListener('submit', validarFormulario);

    // Código del instructor
    // selectorMoneda.addEventListener('change', leerValorSelector);
    // selectorCriptomoneda.addEventListener('change', leerValorSelector);
}

// Código del instructor
// function leerValorSelector(e){
//     objBusqueda[e.target.name] = e.target.value;
//     console.log(objBusqueda);
// }


function consultarTopTenCriptomonedas(){
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
    fetch(url)
        .then( respuesta => respuesta.json())
        .then( datos => {
            if( datos.Response == 'Error'){
                console.log('Error al cargar las Criptomonedas');
                return;
            }

            if( datos.Message === 'Success'){
                const { Data } = datos;
                UI.llenarSelectorCriptomonedas(Data);
            }
        })
}


function cotizarCriptomoneda( moneda, criptomoneda){

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

    // Muestra un spinner de carga
    UI.mostrarSpinner();

    // Hace la petición a la API
    fetch(url)
        .then( respuesta => respuesta.json())
        .then( fullData => { UI.mostrarCotizacionHTML(fullData.DISPLAY[criptomoneda][moneda])})
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
    cotizarCriptomoneda( moneda, criptomoneda);
}