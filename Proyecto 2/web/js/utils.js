const domain = "https://www.cheapshark.com/"; //URL DE LA API
const storesURL = domain + "api/1.0/stores"; //URL PARA OBTENER INFORMACION DE LAS TIENDAS
const dealsURL = domain + "api/1.0/deals"; //URL PARA OBTENER INFORMACION DE LAS OFERTAS

/**
 * 
 * @param {String} urlData 
 * @returns 
 */
async function getData(urlData) {
    let response = await fetch(urlData);
    return response.json();
}