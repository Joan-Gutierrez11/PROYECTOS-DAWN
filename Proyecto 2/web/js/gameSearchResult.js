function getGamesSearch(data) {
    let template = ``;
    Array.from(data).forEach(game =>{
        template += `<div class="col">
                        <div class="card">                            
                            <div class="card-body">
                                <div class="bg-image image-card-result" style="background-image: url('${game['thumb']}');"></div>                            
                                <h5 class="card-title">${game['external']}</h5>
                                <p class="card-text">${game['gameID']}</p>
                                <a href="" class="btn btn-primary">Info juego</a>
                            </div>
                        </div>
                    </div>`;
    });

    document.getElementById('game-search').innerHTML = template;
}