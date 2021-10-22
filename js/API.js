import * as UI from './interfaz.js'

export function consultarTopTenCriptomonedas(){
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

export function cotizarCriptomoneda( moneda, criptomoneda){

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

    // Muestra un spinner de carga
    UI.mostrarSpinner();

    // Hace la petición a la API
    fetch(url)
        .then( respuesta => respuesta.json())
        .then( fullData => { UI.mostrarCotizacionHTML(fullData.DISPLAY[criptomoneda][moneda])})
}