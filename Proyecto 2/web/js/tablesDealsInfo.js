
/**
 * Funcion que devuelve una etiqueta que varia dependiendo del puntaje del juego
 * @param {Number} score 
 * @returns 
 */
function getBadgeMetacritic(score) {
    if(score >= 70)
        return `<span class="badge bg-gradient-success">${score}</span>`;
    if(score >= 50 && score < 70)
        return `<span class="badge bg-gradient-warning">${score}</span>`;
    if(score < 50)
        return `<span class="badge bg-gradient-danger">${score}</span>`;    
}

/**
 * Funcion que actualiza el cuerpo de la tabla de ofertas
 * @param {JSON} dataDeals Arreglo con objetos JSON de las ofertas
 */
const getDeals = (dataDeals) => {    
    let tableBodyDeals = document.querySelector('#table-deals > .card-body table > tbody');

    let template = ``;
    for (let deal of dataDeals) {
        let critic = getBadgeMetacritic(parseInt(deal['metacriticScore']));

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