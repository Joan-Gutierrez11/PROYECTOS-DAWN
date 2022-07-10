
const infoStores = async () => {

    let storeId, name, spanActive, logoURL;
    let template;

    const table = document.querySelector('#table-games-stores > tbody');
    const numStores = document.querySelector('#game-stores-section .card > .card-header > p');

    let dataStores = await getData(storesURL);

    for (let dataStore of dataStores) {
        storeId = dataStore['storeID']; name = dataStore['storeName']; 
        logoURL = domain + dataStore['images']['logo'];
        spanActive = getAvailable(Boolean(dataStore['isActive']));
        template = `<tr>
                        <td class="align-middle text-center">
                            <p class="font-weight-bold mb-0">${storeId}</p>
                        </td>
                        <td>
                            <div class="d-flex px-2 py-1">
                                <div>
                                    <img src="${logoURL}" class="avatar avatar-sm me-3" alt=${name}>
                                </div>
                                <div class="d-flex flex-column justify-content-center">
                                    <h6 class="mb-0">${name}</h6>                    
                                </div>
                            </div>
                        </td>
                        <td class="align-middle text-center">${spanActive}</td>
                    </tr>`;
        table.innerHTML += template;
    }

    numStores.innerHTML += `<span>Information of ${data.length} stores games</span>`;
};

function getAvailable(active) {
    return active ? '<span class="badge bg-gradient-success">Available</span>' : '<span class="badge bg-gradient-danger">Not Available</span>';
}

document.addEventListener('DOMContentLoaded', infoStores);