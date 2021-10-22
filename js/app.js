
// Selectores
const formulario = document.querySelector('#formulario');
const selectorMoneda = document.querySelector('#moneda');
const selectorCriptomoneda = document.querySelector('#criptomonedas');
const resultado = document.querySelector('#resultado');

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

function llenarSelectorCriptomonedas(Data){
    Data.forEach( (infoCriptomoneda) => {
        const { CoinInfo: { FullName, Name } } = infoCriptomoneda;
        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;

        selectorCriptomoneda.appendChild(option);
    });
}

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
                llenarSelectorCriptomonedas(Data);
            }
        })
}

// function mostarAlerta(){

// }

function cotizarCriptomoneda( moneda, criptomoneda){

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
    fetch(url)
        .then( respuesta => respuesta.json())
        .then( fullData => { console.log(fullData)})
}


function validarFormulario(e){
    e.preventDefault();
    const moneda = selectorMoneda.value;
    const criptomoneda = selectorCriptomoneda.value;

    if( moneda === '' || criptomoneda === ''){
        // mostarAlerta('Ambos campos son obligatorios', 'tipo', 2500);
        return;
    }

    cotizarCriptomoneda( moneda, criptomoneda);
}