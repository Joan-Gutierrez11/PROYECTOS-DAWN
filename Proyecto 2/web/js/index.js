
document.addEventListener('DOMContentLoaded', async ()=>{
    let dataStores = await getData(storesURL);
    let dataDeals = await getData(dealsURL);

    // Se carga la informacion de la tabla que contiene las tiendas
    chargeStoreTable(dataStores);
    updateStoresAvailables(dataStores);

    updatePercentageGames(dataDeals);
    updateAAAGames(dataDeals);
    
    createChartOfDeals(dataDeals, (animation, dict)=>{
        let progressBar = document.querySelector('#offer-data-days > .progress >.progress-bar');
        let porcentaje = (animation.currentStep / animation.numSteps)*100;
        progressBar.style.width = `${porcentaje}%`;
        
        if (porcentaje >= 100) {
            document.querySelector('#offer-data-days')
                .innerHTML = `<h6 class="mb-0 ">Juegos puestos en ofertas</h6>
                                    <p class="text-sm ">Diariamente</p>
                                    <hr class="dark horizontal">
                                    <div class="d-flex">
                                        <i class="material-icons text-sm my-auto me-1">schedule</i>
                                        <p class="mb-0 text-sm">Datos obtenidos de los ultimos ${dict.length} dias</p>
                                    </div>`;
        }
    });
    createChartOfDiscounts(dataDeals, (animation, dict)=>{});

});