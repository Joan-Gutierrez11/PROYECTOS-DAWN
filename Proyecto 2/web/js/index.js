
document.addEventListener('DOMContentLoaded', async ()=>{
    let dataStores = await getData(storesURL);
    let dataDeals = await getData(dealsURL);

    // Se carga la informacion de la tabla que contiene las tiendas
    chargeStoreTable(dataStores);
    updateStoresAvailables(dataStores);

    updatePercentageGames(dataDeals);
    updateAAAGames(dataDeals);
    
    createChartOfDeals(dataDeals);
    createChartOfDiscounts(dataDeals);

});