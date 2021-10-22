
// Selectores
const formulario = document.querySelector('#formulario');
const selectorMoneda = document.querySelector('#moneda');
const selectorCriptomoneda = document.querySelector('#criptomonedas');
const resultado = document.querySelector('#resultado');

window.onload = () => {
    consultarTopTenCriptomonedas();
    // formulario.addEventListener('submit', validarFormulario);
}

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
                console.log(Data);
                llenarSelectorCriptomonedas(Data);
            }
        })
}

// function validarFormulario(){

// }