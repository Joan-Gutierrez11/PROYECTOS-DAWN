/**
 * CARGA INCIAL DE LAS OFERTAS
 */
document.addEventListener('DOMContentLoaded', async ()=>{
    let dataDeals = await getData("https://www.cheapshark.com/api/1.0/deals");
    getDeals(dataDeals);
});

/**
 * CARGA DE LAS OPCIONES
 */
document.addEventListener('DOMContentLoaded', async () => {
    let stores = await getData(storesURL);
    Array.from(stores).forEach(store => {
        if(! Boolean(store['isActive']))
            document.getElementById('select-store').innerHTML += `<option value='${store['storeID']}'>${store['storeName']} (No disponible)</option>`;
        else
            document.getElementById('select-store').innerHTML += `<option value='${store['storeID']}'>${store['storeName']}</option>`;
    });        
});

/**
 * ACCION PARA APLICAR FILTROS
 */
document.getElementById('button-filter').addEventListener('click', async ()=>{
    let dealFilterURL = getUrl(dealsURL); 
    let dataDeals = await getData(dealFilterURL);
    getDeals(dataDeals);
});

/**
 * ACCION PARA RESTAURAR LOS VALORES DE LOS CAMPOS
 */
document.getElementById('button-restart').addEventListener('click', async ()=>{
    let dataDeals = await getData(dealsURL);    
    getDeals(dataDeals);
    resetAllFilters();
});


/**
 * LISTENER PARA OCULTAR O MOSTRAR LOS FILTROS
 */
document.getElementById('showFilter').addEventListener('click', () => {
    let element = document.getElementById('options-filters');
    if(element.classList.contains('fade-out-top')){                             
        element.classList.toggle('fade-out-top');        
        element.classList.add('fade-in-top');
    }
    else {        
        element.classList.toggle('fade-in-top');        
        element.classList.add('fade-out-top');
    }
});