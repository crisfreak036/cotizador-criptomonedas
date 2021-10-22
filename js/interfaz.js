// Selectores
export const formulario = document.querySelector('#formulario'),
    selectorMoneda = document.querySelector('#moneda'),
    selectorCriptomoneda = document.querySelector('#criptomonedas'),
    resultado = document.querySelector('#resultado');

// Funciones
export function llenarSelectorCriptomonedas(Data){
    Data.forEach( (infoCriptomoneda) => {
        const { CoinInfo: { FullName, Name } } = infoCriptomoneda;
        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;

        selectorCriptomoneda.appendChild(option);
    });
}

export function mostarAlerta( mensaje, tipo, tiempo){
    if(!document.querySelector('.alerta-personalizada')){

        // Crea un contenedor
        const alerta = document.createElement('div');
        
        // Dependiendo el tipo, se agregan ciertas clases
        if( tipo === 'error'){
            alerta.classList.add('error', 'alerta-personalizada');
            // Agrega contenido al contenedor
            alerta.textContent = mensaje;
        }
        
        // Agrega la alerta al HTML
        resultado.appendChild(alerta);
        
        // Elimina la alerta después de n segundos
        setTimeout(() => {
            alerta.remove();
        }, tiempo);
    }
}

export function mostrarCotizacionHTML( cotizacion ){    
    const { CHANGEPCT24HOUR, HIGHDAY, LOWDAY, LASTUPDATE, PRICE } = cotizacion;

    // Limpia cotizaciones anteriores
    limpiarResultadoAnterior(resultado);

    // Parrafos para los precios
    const precioActual = document.createElement('p');
    precioActual.classList.add('precio');
    precioActual.innerHTML = `Precio actual: <span>${PRICE}</span>`;

    const precioAlto = document.createElement('p');
    precioAlto.innerHTML = `Precio más alto del día: <span>${HIGHDAY}</span>`;

    const precioBajo = document.createElement('p');
    precioBajo.innerHTML = `Precio más bajo del día: <span>${LOWDAY}</span>`;

    const variacion24horas = document.createElement('p');
    variacion24horas.innerHTML = `Variación últimas 24 horas: <span>${CHANGEPCT24HOUR} &#37;</span>`;
    
    const ultimaActualizacion = document.createElement('p');
    ultimaActualizacion.innerHTML = `Última Actualización: <span>${LASTUPDATE}</span>`;

    // Agrega todo al DOM
    resultado.append(precioActual, precioAlto, precioBajo, variacion24horas, ultimaActualizacion);
}

export function limpiarResultadoAnterior( elementoPadre ){
    while(elementoPadre.firstChild){
        elementoPadre.removeChild(elementoPadre.firstChild);
    }
}

export function mostrarSpinner(){
    
    limpiarResultadoAnterior(resultado);
    
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    spinner.innerHTML = `
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    `
    resultado.appendChild(spinner);
}