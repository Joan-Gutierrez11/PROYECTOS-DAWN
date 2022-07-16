function getFilterNormalPrice(price) {
    let lowerNormPrice = document.getElementById('lower-normal-price').value;
    let upperNormPrice = document.getElementById('upper-normal-price').value;
    let condition = true;

    if (lowerNormPrice)
        condition = condition && (price > parseFloat(lowerNormPrice));
    if (upperNormPrice)
        condition = condition && (price < parseFloat(upperNormPrice));
    return condition;
}

function getFilterByName(name) {
    let nameInput = document.getElementById('name-filter');
    return name.toLowerCase().includes(nameInput.value.toLowerCase());
}

document.getElementById('button-filter').addEventListener('click', async ()=>{
    let dataDeals = await getData(dealsURL);
    let result = Array.from(dataDeals).filter(data => getFilterNormalPrice(data["normalPrice"]) && getFilterByName(data["title"]));
    getDeals(result);
});

document.getElementById('button-restart').addEventListener('click', async ()=>{
    let dataDeals = await getData(dealsURL);    
    getDeals(dataDeals);

    document.getElementById('name-filter').value = '';
    document.getElementById('lower-normal-price').value = '';
    document.getElementById('upper-normal-price').value = '';
});