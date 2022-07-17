function getFilterByLowerPrice() {
    let filterPrice = document.getElementById('lower-normal-price').value;    
    return filterPrice ? `lowerPrice=${filterPrice}` : undefined;
}

function getFilterByUpperPrice() {
    let filterPrice = document.getElementById('upper-normal-price').value;
    return filterPrice ? `upperPrice=${filterPrice}` : undefined;
}

function getFilterByName() {    
    let name = document.getElementById('name-filter').value;
    return name ? `title=${name}` : undefined;
}

function getFilterByStores() {
    let select = document.getElementById('select-store');
    let valueSelect = select.options[select.selectedIndex].value;
    if (valueSelect == '0')
        return undefined
    return valueSelect ? `storeID=${valueSelect}` : undefined;
}

function getFilterAAA() {
    let checkAAAGame = document.getElementById('game-AAA');
    return checkAAAGame.checked ? `AAA=${1}` : undefined;
}

function getFilterActive() {
    let checkAAAGame = document.getElementById('deal-active');
    return checkAAAGame.checked ? `onSale =${1}` : undefined;  
}


function getUrl(url) {
    let resultURL = url;
    let title = getFilterByName();
    if(title)
        resultURL.includes('?') ? resultURL += '&'+title : resultURL += '?'+title;
    
    let lower = getFilterByLowerPrice();
    if(lower)
        resultURL.includes('?') ? resultURL += '&'+lower : resultURL += '?'+lower;

    let upper = getFilterByLowerPrice();
    if(upper)
        resultURL.includes('?') ? resultURL += '&'+upper : resultURL += '?'+upper;

    let storeID = getFilterByStores();
    if(storeID)
        resultURL.includes('?') ? resultURL += '&'+storeID : resultURL += '?'+storeID;

    let AAA = getFilterAAA();
    if(AAA)
        resultURL.includes('?') ? resultURL += '&'+AAA : resultURL += '?'+AAA;

    let active = getFilterActive();
    if(active)
        resultURL.includes('?') ? resultURL += '&'+active : resultURL += '?'+active;

    return resultURL;
}

function resetAllFilters() {
    let allLabels = document.querySelectorAll('.input-group');
    for (let element of allLabels) {
        element.children[1].value = '';
        element.classList.remove('is-filled');        
    }
    document.getElementById('select-store').selectedIndex = 0;
    document.getElementById('game-AAA').checked = false;
    document.getElementById('deal-active').checked = false;
}