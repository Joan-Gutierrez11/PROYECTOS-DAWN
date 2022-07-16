function getStores(data) {    
    let template = ``;
    let active;

    Array.from(data).forEach(element => {
        active = getAvailable(Boolean(element['isActive']));
        template += `<tr>
                        <td class="align-middle text-center">
                            <p class="font-weight-bold mb-0">${element['storeID']}</p>
                        </td>
                        <td>
                            <div class="d-flex px-2 py-1">
                                <div>
                                    <img src="${domain + element['images']['logo']}" class="avatar avatar-sm me-3" alt=${element['storeName']}>
                                </div>
                                <div class="d-flex flex-column justify-content-center">
                                    <h6 class="mb-0">${element['storeName']}</h6>                    
                                </div>
                            </div>
                        </td>
                        <td class="align-middle text-center">${active}</td>
                    </tr>`;
    });

    return template;
}


function getAvailable(active) {
    return active ? '<span class="badge bg-gradient-success">Available</span>' : '<span class="badge bg-gradient-danger">Not Available</span>';
}

function chargeStoreTable(data) {
    let table = document.querySelector('#table-games-stores > tbody');
    let numStores = document.querySelector('#game-stores-section .card > .card-header > p');
    
    table.innerHTML = getStores(data);
    numStores.innerHTML += `<span>Information of ${data.length} stores games</span>`;
}