document.addEventListener('DOMContentLoaded', ()=>{
    let json =  {
                    "nombreCancion": "voluptatem",
                    "imagen": "https://i.scdn.co/image/ab67616d0000b273a304e418d7a5d524140b1d56",
                    "nombreAlbum": "ザ・ベスト・オブ・エルヴィス ゴールデン・コレクション",
                    "duracion": 175587,
                    "url_cancion": "https://p.scdn.co/mp3-preview/8dac04919452598b11b58e64f74ff26948a31a0d?cid=5389212a208a43f5a2d0355d946249b0",
                    "album_id": 13,
                    "letra": "illo ex nostrum"
                };

    let json2 = [
        {
            "id": "998",
            "nombreCancion": "ipsam",
            "nombreAlbum": "Michael",
            "imagen": "https://i.scdn.co/image/ab67616d0000b273a7ef06d1e0bad6fe2ff028f6",
            "duracion": 158792
        },                                        
        {
            "id": "999",
            "nombreCancion": "distinctio",
            "nombreAlbum": "Purple (2019 Remaster; Super Deluxe)",
            "imagen": "https://i.scdn.co/image/ab67616d0000b273321175842c7c2e55c9537573",
            "duracion": 161545
        }
    ];

    let json3 = [
                    {
                    "id": "38",
                    "nombreCancion": "est",
                    "nombreAlbum": "Scream",
                    "imagen": "https://i.scdn.co/image/ab67616d0000b273cde37cfdee48dc0eae1e2ab8",
                    "duracion": 135931
                    },
                ];                      

    let json4 = [
                    {
                    "id": "38",
                    "nombreCancion": "est",
                    "nombreAlbum": "Scream",
                    "imagen": "https://i.scdn.co/image/ab67616d0000b273cde37cfdee48dc0eae1e2ab8",
                    "duracion": 135931
                    },
                ];

    document.getElementById('cancion-result-id').innerHTML = JSON.stringify(json, null, '  ')
    document.getElementById('canciones-result').innerHTML = JSON.stringify(json2, null, '  ');
    document.getElementById('canciones-album-result').innerHTML = JSON.stringify(json3, null, '  ');
    document.getElementById('cancion-artista').innerHTML = JSON.stringify(json4, null, '  ');
    
});