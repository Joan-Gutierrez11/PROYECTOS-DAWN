
/**
 * Funcion que devuelve una etiqueta que varia dependiendo del puntaje del juego o si no tiene una critica
 * @param {Number} score 
 * @returns 
 */
function getBadgeMetacritic(game) {
    let score = parseInt(game['metacriticScore']);
    let metaCriticLink = game['metacriticLink'];

    if(metaCriticLink){
        if(score >= 70)
            return `<span class="badge bg-gradient-success">${score}</span>`;
        if(score >= 50 && score < 70)
            return `<span class="badge bg-gradient-warning">${score}</span>`;
        if(score < 50)
            return `<span class="badge bg-gradient-danger">${score}</span>`;    
    }
    return `<span class="badge bg-gradient-secondary">N/A</span>`;    
}

/**
 * Funcion que actualiza el cuerpo de la tabla de ofertas
 * @param {JSON} dataDeals Arreglo con objetos JSON de las ofertas
 */
const getDeals = (dataDeals) => {    
    let tableBodyDeals = document.querySelector('#table-deals > .card-body table > tbody');
    let template = ``;

    if(dataDeals.length == 0){
        tableBodyDeals.innerHTML = `<tr>
                                        <td colspan="5" class="text-center">No hay informacion disponible por el momento</td>
                                    </tr>`;
        return;
    }
        
    for (let deal of dataDeals) {
        let critic = getBadgeMetacritic(deal);

        template += `<tr>
                        <td class="ps-4 text-secondary text-xxs font-weight-bolder opacity-7">                        
                            <p class="mb-0">${deal['title']}</p>                                            
                        </td>
                        <td class="align-middle text-center">
                            <p class="font-weight-bold mb-0">$ ${deal['normalPrice']}</p>
                        </td>
                        <td class="align-middle text-center">
                            <p class="font-weight-bold mb-0">$ ${deal['salePrice']}</p>
                        </td>
                        <td class="align-middle text-center">${parseFloat(deal['savings']).toFixed(2)} %</td>
                        <td class="align-middle text-center">${critic}</td>                      
                    </tr>`;           
    }

    tableBodyDeals.innerHTML = template;
}