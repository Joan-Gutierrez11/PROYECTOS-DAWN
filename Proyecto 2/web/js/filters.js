const buttonNameFilter = document.querySelector('#name_filter > div button');
const buttonPriceFilter = document.querySelector('#price_filter > div button');

function getBadgeMetacritic(score) {
    if(score >= 70)
        return `<span class="badge bg-gradient-success">${score}</span>`;
    if(score >= 50 && score < 70)
        return `<span class="badge bg-gradient-warning">${score}</span>`;
    if(score < 50)
        return `<span class="badge bg-gradient-danger">${score}</span>`;    
}

buttonNameFilter.addEventListener('click', async () => {
    let data = await getData("https://www.cheapshark.com/api/1.0/deals");
    let inputName = document.querySelector('#name_filter > div > .input-group > input');
    let tableBodyDeals = document.querySelector('#table-deals > .card-body table > tbody');

    let filterData = Array.from(data).filter(a => a['title'].toLowerCase().includes(inputName.value.toLowerCase()));
    let template;

    tableBodyDeals.innerHTML = ''
    filterData.forEach((elem) => {
        let score = getBadgeMetacritic(elem['metacriticScore'])
        template = `<tr>
                        <td class="ps-4 text-secondary text-xxs font-weight-bolder opacity-7">                        
                            <p class="mb-0">${elem['title']}</p>                                            
                        </td>
                        <td class="align-middle text-center">
                            <p class="font-weight-bold mb-0">$ ${elem['normalPrice']}</p>
                        </td>
                        <td class="align-middle text-center">
                            <p class="font-weight-bold mb-0">$ ${elem['salePrice']}</p>
                        </td>
                        <td class="align-middle text-center">${parseFloat(elem['savings']).toFixed(2)} %</td>
                        <td class="align-middle text-center">${score}</td>                      
                    </tr>`;
        tableBodyDeals.innerHTML += template;
    });
});

buttonPriceFilter.addEventListener('click', async () =>{
    let data = await getData("https://www.cheapshark.com/api/1.0/deals");
    let lowerInput = document.querySelector('#lower');
    let upperInput = document.querySelector('#upper');
    let tableBodyDeals = document.querySelector('#table-deals > .card-body table > tbody');

    let filterData = Array.from(data).filter(game => {
        let gamePrice = parseFloat(game['normalPrice']);
        let inputLowerPrice = parseFloat(lowerInput.value);
        let inputUpperPrice = parseFloat(upperInput.value);    
        return gamePrice >= inputLowerPrice && gamePrice <= inputUpperPrice;            
    });

    let template;

    tableBodyDeals.innerHTML = ''
    filterData.forEach((elem) => {
        let score = getBadgeMetacritic(elem['metacriticScore'])
        template = `<tr>
                        <td class="ps-4 text-secondary text-xxs font-weight-bolder opacity-7">                        
                            <p class="mb-0">${elem['title']}</p>                                            
                        </td>
                        <td class="align-middle text-center">
                            <p class="font-weight-bold mb-0">$ ${elem['normalPrice']}</p>
                        </td>
                        <td class="align-middle text-center">
                            <p class="font-weight-bold mb-0">$ ${elem['salePrice']}</p>
                        </td>
                        <td class="align-middle text-center">${parseFloat(elem['savings']).toFixed(2)} %</td>
                        <td class="align-middle text-center">${score}</td>                      
                    </tr>`;
        tableBodyDeals.innerHTML += template;
    });
});