const domain = "https://www.cheapshark.com/"; //URL DE LA API
const storesURL = domain + "api/1.0/stores"; //URL PARA OBTENER INFORMACION DE LAS TIENDAS
const dealsURL = domain + "api/1.0/deals"; //URL PARA OBTENER INFORMACION DE LAS OFERTAS

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * 
 * @param {String} urlData 
 * @returns 
 */
async function getData(urlData) {
    let response = await fetch(urlData);
    return response.json();
}

/**
 * 
 * @param {string} urlData 
 * @param {*} loaderFunction 
 * @param {*} time 
 * @returns 
 */
async function getDataByLowCharge(urlData, loaderFunction, time) {
    let responseData = await fetch(urlData);
    const reader = responseData.body.getReader();
    const contentLength = responseData.headers.get('Content-Length');

    let receivedLength = 0; // bytes recibidos en este momento
    let chunks = []; // arreglo de fragmentos binarios recibidos (conforman el cuerpo) 
    while(true) {
        const {done, value} = await reader.read();

        if (done)
            break;

        chunks.push(value);
        receivedLength += value.length;

        await wait(time);
        loaderFunction(receivedLength, contentLength);
    }

    // Paso 4: concatenar los framgento en un único Uint8Array
    let chunksAll = new Uint8Array(receivedLength); // (4.1)
    let position = 0;
    for(let chunk of chunks) {
      chunksAll.set(chunk, position); // (4.2)
      position += chunk.length;
    }

    // Paso 5: decodificar en una cadena
    let result = new TextDecoder("utf-8").decode(chunksAll);

    // Listo!
    let data = JSON.parse(result);    
    return data;
}