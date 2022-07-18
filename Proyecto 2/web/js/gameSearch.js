function getGamesSearch(data) {
    let template = ``;
    Array.from(data).forEach(game =>{
        template += `<div class="col">
                        <div class="card">                            
                            <div class="card-body">
                                <div class="bg-image image-card-result" style="background-image: url('${game['thumb']}');"></div>                            
                                <h5 class="card-title">${game['external']}</h5>
                                <p class="card-text">${game['gameID']}</p>
                                <a href="gameDetail.html" class="btn btn-primary enlace">Info juego</a>
                            </div>
                        </div>
                    </div>`;
    });
    document.getElementById('game-search').innerHTML = template;

    document.querySelectorAll('.enlace').forEach(elem => {
        elem.addEventListener('click', () => {            
            sessionStorage.setItem('idJuego', elem.parentNode.querySelector('p').innerHTML)                        
        })
    })
}

document.querySelector('#find-game-form > button').addEventListener('click', async () =>{
    let name = document.querySelector('#find-game-form > input').value;

    let url = gameSearchURL + `?title=${name}`;
    let gameData = await getData(url);

    if(gameData.length > 0){
        document.getElementById('games-no-search').innerHTML = '';
        getGamesSearch(gameData);
    } else{
        document.getElementById('game-search').innerHTML = '';
        document.getElementById('games-no-search').innerHTML = `<div class="card col-12">                                                                
                                                                    <div class="card-body">
                                                                        <h5 class="card-title">No existen juegos que coordinen con la busqueda</h5>                                                                        
                                                                    </div>
                                                                </div>`;
    }
});
