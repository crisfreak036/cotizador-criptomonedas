import * as UI from './interfaz.js'

export async function consultarTopTenCriptomonedas(){
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        if( datos.Response == 'Error'){
            console.log('Error al cargar las Criptomonedas');
            return;
        }

        if( datos.Message === 'Success'){
            const { Data } = datos;
            UI.llenarSelectorCriptomonedas(Data);
        }
    } catch (error) {
        console.log(error);
    }
}

export async function cotizarCriptomoneda( moneda, criptomoneda){

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

    // Muestra un spinner de carga
    UI.mostrarSpinner();

    try {
        const respuesta = await fetch(url);
        const fullData = await respuesta.json();
        UI.mostrarCotizacionHTML(fullData.DISPLAY[criptomoneda][moneda]) 
    } catch (error) {
        console.log(error);
    }
}