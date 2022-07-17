// const domain = "https://www.cheapshark.com/";
// const storesURL = domain + "api/1.0/stores";
// const dealsURL = domain + "api/1.0/deals";

const updateStoresAvailables = (dataStores) => {
    let numberStoresTag = document.querySelector('#number-of-stores > .card-header > .text-end > h4');
    let addInfoTag = document.querySelector('#number-of-stores > .card-footer');
    
    let availableStores = Array.from(dataStores).filter(store => Boolean(store['isActive'])).length;
    numberStoresTag.innerHTML = availableStores;

    let percent = availableStores/dataStores.length * 100;    
    addInfoTag.innerHTML = `<p class="mb-0">
                                <span class="text-success text-sm font-weight-bolder"> ${percent.toFixed(2)}% </span> 
                                de las tiendas tienen info. disponible
                            </p>`;
}

const updatePercentageGames = (dataDeals) => {
    let percentageGamesTag = document.querySelector('#percentage-of-games > .card-header > .text-end > h4');
    let addInfoTag = document.querySelector('#percentage-of-games > .card-footer');
    
    let numGamesDiscount = Array.from(dataDeals).filter(deal => deal['savings'] > 90).length;
    let percent = numGamesDiscount/dataDeals.length * 100;

    percentageGamesTag.innerHTML = String(percent.toFixed(2)) + '%';
    addInfoTag.innerHTML = `<p class="mb-0">Tienen un descuento mayor al 90%</p>`;
}

const updateAAAGames = (dataDeals) => {
    let tripleAGamesTag = document.querySelector('#aaa-games > .card-header > .text-end > h4');
    let addInfoTag = document.querySelector('#aaa-games > .card-footer');

    let numGamesAAA = Array.from(dataDeals).filter(deal => deal['normalPrice'] > 25).length;
    let percent = numGamesAAA/dataDeals.length * 100;

    tripleAGamesTag.innerHTML = String(percent.toFixed(2)) + '%';
    addInfoTag.innerHTML = `<p class="mb-0">Estan en oferta</p>`;
}
