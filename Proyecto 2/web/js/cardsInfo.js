// const domain = "https://www.cheapshark.com/";
// const storesURL = domain + "api/1.0/stores";

const dealsURL = domain + "api/1.0/deals";

async function getData(urlData) {
    let response = await fetch(urlData);
    return response.json();
}

const updateStoresAvailables = async () => {
    let numberStoresTag = document.querySelector('#number-of-stores > .card-header > .text-end > h4');
    let addInfoTag = document.querySelector('#number-of-stores > .card-footer');
    let data = await getData(storesURL);
    
    let availableStores = 0;
    for (let store of data) {
        if(Boolean(store['isActive']))
            availableStores++;
    }

    numberStoresTag.innerHTML = availableStores;
    let percent = availableStores/data.length * 100;    
    addInfoTag.innerHTML = `<p class="mb-0">
                                <span class="text-success text-sm font-weight-bolder">${percent.toFixed(2)}% </span> 
                                of stores have information available
                            </p>`;
}

const updatePercentageGames = async () => {
    let percentageGamesTag = document.querySelector('#percentage-of-games > .card-header > .text-end > h4');
    let addInfoTag = document.querySelector('#percentage-of-games > .card-footer');

    let data = await getData(dealsURL);

    let numGamesDiscount = 0;
    for (let deal of data) {
        if(deal['savings'] > 90)
            numGamesDiscount++;
    }

    let percent = numGamesDiscount/data.length * 100;
    percentageGamesTag.innerHTML = String(percent.toFixed(2)) + '%';
    addInfoTag.innerHTML = `<p class="mb-0">Have a discount of more than 90%</p>`;
}

const updateAAAGames = async () => {
    let tripleAGamesTag = document.querySelector('#aaa-games > .card-header > .text-end > h4');
    let addInfoTag = document.querySelector('#aaa-games > .card-footer');

    let data = await getData(dealsURL);

    let numGamesAAA = 0;
    for (let deal of data) {
        if(deal['normalPrice'] > 25)
            numGamesAAA++;
    }

    let percent = numGamesAAA/data.length * 100;
    tripleAGamesTag.innerHTML = String(percent.toFixed(2)) + '%';
    addInfoTag.innerHTML = `<p class="mb-0">Have a discount</p>`;
}


document.addEventListener('DOMContentLoaded', () => {
    updateStoresAvailables();
    updatePercentageGames();
    updateAAAGames();
});