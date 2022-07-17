/**
 * Funcion para crear un diccionario de las tiendas disponibles.
 * Ej: {storeID (clave) :{'name':nombre de la tienda, 'logo':url del logo }}
 * @param {*} dataStores 
 * @returns 
 */
function createDictionaryStores(dataStores) {
    let dict = {};

    Array.from(dataStores).forEach(store => {
        dict[store['storeID']] = {
            "name": store['storeName'],
            "logo": domain + store['images']['logo']
        }
    });
    return dict;
}

/**
 * Funcion para crear el diccionario que funcionara para crear el grafico
 * @param {*} dataDeals 
 * @param {*} dictStores 
 * @returns 
 */
function getDataForChart(dataDeals, dictStores) {
    let dataChart = {}
    
    Array.from(dataDeals).forEach(elem => {
        let nameStore = dictStores[elem['storeID']]['name'];
        let saving =  parseFloat(elem['savings']);
        dataChart[nameStore] = saving;
    });

    return dataChart;
}

/**
 * Funcion para crear el grafico de descuentos
 * @param {*} dataChart 
 */
function createChartDiscount(dataChart) {
    let ctx = document.getElementById('saving-charts');

    let keys = Object.keys(dataChart);
    let values = keys.map(k => dataChart[k]);

    let colors = (rgbColor, num) => {
        let list = [];
        let n = 0;
        while (n < num) {
            list.push(rgbColor);
            n++;
        }
        return list;
    }
    
    new Chart(ctx, {
        type: 'bar',// Tipo de gráfica
        data: {
            labels: keys,
            datasets: [{
                label: 'Descuentos',
                data: values,
                backgroundColor: colors('rgb(54, 162, 235)', keys.length),
            }]            
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
            },
        }
    });
}

document.addEventListener('DOMContentLoaded', async () =>{
    let idJuego = sessionStorage.getItem('idJuego');

    //Obtenemos los datos
    let dataDeals = await getData(gameSearchURL + `?id=${idJuego}`);
    let dataStores = await getData(storesURL);

    //Ponemos la informacion del juego en los campos correspondientes
    document.querySelector('#info-game > h2').innerHTML = dataDeals['info']['title'];
    document.querySelector('#info-game > p').innerHTML = idJuego;
    document.querySelector('#img-game').innerHTML = `<img src="${dataDeals['info']['thumb']}" class="img-thumbnail">`;

    let storesDict = createDictionaryStores(dataStores);
    let dataChart = getDataForChart(dataDeals['deals'], storesDict);
    createChartDiscount(dataChart);
});

